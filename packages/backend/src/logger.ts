// lib/logger.ts (별도 파일)
import * as fs from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto'

interface LogEntry {
  timestamp: string
  type: string
  errorCode?: number | string
  errorMessage?: string  
  log: string
}

interface ApiLogEntry {
  timestamp: string
  type: string
  hash: string
  durationMs?: number
  errorCode?: number | string
  errorMessage?: string
  method: string
}

interface QueryLogEntry {
  timestamp: string
  type: string
  hash: string
  durationMs?: number
  resultCount?: number
  errorCode?: number | string
  errorMessage?: string
  sql: string
}


class Logger {
  private static logDir = './logs'
  private static logBuffer: string[] = []

  private static async initLogDir() {
    await fs.mkdir(this.logDir, { recursive: true })
  }

  private static getLogFilePath(): string {
    const date = new Date().toISOString().slice(0, 10)
    return path.join(this.logDir, `oracle-queries-${date}.jsonl`)
  }

  public static getHash(): string {
    const uniqueInput = `${Date.now()}-${Math.random()}`;
    return crypto.createHash('md5').update(uniqueInput).digest('hex').slice(0, 8)
  }

  /// SQL에 바인드 변수를 적용하여 완성된 SQL 문자열을 반환하는 메서드
  private static applyBindsToSql(sql: string, binds: any[]): string {
    let result = sql;
    const placeholders = sql.match(/:\w+|:[\d]+/g) || [];
    
    placeholders.forEach((ph, index) => {
      const bindValue = Array.isArray(binds) ? binds[index] : binds[ph.slice(1)];
      const formattedValue = typeof bindValue === 'string' 
        ? `'${bindValue.replace(/'/g, "''")}'` 
        : bindValue;
      result = result.replace(ph, formattedValue);
    });
    
    return result;
  }
  // 시스템 관련 로그 기록 메서드
  private static createLogEntry(
    type: 'i' | 'w' | 'e',
    log: string,
    error?: any
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      type: type === 'i' ? 'system info' : type === 'w' ? 'system warning' : 'system error',
      errorCode: error?.errorNum || error?.code,
      errorMessage: error instanceof Error ? error.message : String(error),
      log: log
    }
  }
  static async log(type: 'i' | 'w', log: string) {
    await this.initLogDir()
    const logEntry = this.createLogEntry(type, log)
    this.logBuffer.push(JSON.stringify(logEntry))
    await this.flushBuffer()
  }
  static async logError(log: string, error: any) {
    const logEntry = this.createLogEntry('e', log, error)
    this.logBuffer.push(JSON.stringify(logEntry))
    
    await this.flushBuffer()
  }
  private static createApiLogEntry(
    method: string,
    binds: any[],
    error?: any
  ): ApiLogEntry {
    return {
      timestamp: new Date().toISOString(),
      hash: Logger.getHash(),
      type: 'api start',
      errorCode: error?.errorNum || error?.code,
      errorMessage: error instanceof Error ? error.message : String(error),
      durationMs: error ? undefined : Date.now() - (globalThis as any).queryStartTime!,
      method: method
    }
  }

  static async logApiStart(hash: string, sql: string, binds: any[]) {
    await this.initLogDir()
    const logEntry = this.createQueryLogEntry('start', hash, sql, binds)
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
  }

  static async logApiSuccess(hash: string, sql: string, binds: any[], resultCount: number) {
    const logEntry = this.createQueryLogEntry('success', hash, sql, binds, resultCount)
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
    const duration = Date.now() - (globalThis as any).queryStartTime!
    
    await this.flushBuffer()
  }

  static async logApiError(hash: string, sql: string, binds: any[], error: any) {
    const logEntry = this.createQueryLogEntry('error', hash, sql, binds, undefined, error)
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
    const duration = Date.now() - (globalThis as any).queryStartTime!
    
    await this.flushBuffer()
  }

  private static createQueryLogEntry(
    sql: string,
    binds: any[]
  ): QueryLogEntry {
    return {
      timestamp: new Date().toISOString(),
      type: 'query start',
      hash: Logger.getHash(),
      durationMs: Date.now() - (globalThis as any).queryStartTime!,
      sql: this.applyBindsToSql(sql, binds)
    }
  }

  static async logQueryStart(sql: string, binds: any[]): Promise<QueryLogEntry> {
    await this.initLogDir()
    const logEntry = this.createQueryLogEntry(sql, binds)
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
    return logEntry;
  }

  static async logQuerySuccess(logEntry: QueryLogEntry, resultCount: number) {
    logEntry.type = 'query success';
    logEntry.resultCount = resultCount;
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
    const duration = Date.now() - (globalThis as any).queryStartTime!
    
    await this.flushBuffer()
  }

  static async logQueryError(logEntry: QueryLogEntry, error: any): Promise<QueryLogEntry> {
    logEntry.type = 'query error';
    logEntry.errorCode = error?.errorNum || error?.code;
    logEntry.errorMessage = error instanceof Error ? error.message : String(error);
    const logEntryString = JSON.stringify(logEntry).replace(/\\n/g, String.fromCharCode(13) + String.fromCharCode(10))
    this.logBuffer.push(logEntryString)
    const duration = Date.now() - (globalThis as any).queryStartTime!
    
    await this.flushBuffer()
    return logEntry;  
  }

  private static async flushBuffer() {
    if (this.logBuffer.length === 0) return
    
    const logFile = this.getLogFilePath()
    await fs.appendFile(logFile, this.logBuffer.join('\n') + '\n')
    this.logBuffer = []
  }
}

export default Logger
