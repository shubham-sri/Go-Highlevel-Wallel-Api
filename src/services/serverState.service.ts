class ServerState {
  private _dbConnection = false

  public get dbConnection() {
    return this._dbConnection
  }
  public set dbConnection(state: boolean) {
    this._dbConnection = state
  }
}

export const ServerStateService = new ServerState()
