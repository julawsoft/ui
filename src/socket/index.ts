import { io as IOServer, Socket as IOSocket } from 'socket.io-client'
import { SOCKET_KEYS } from '../constants/socket'

export default class Socket {
  private SOCKET_ADDRESS: string
  public employeeId: number
  public pushNotifications: any
  public notifications: string[]

  constructor(
    SOCKET_ADDRESS: string,
    employeeId: number,
    pushNotifications: any,
    notifications: string[],
  ) {
    this.SOCKET_ADDRESS = SOCKET_ADDRESS
    this.employeeId = employeeId
    this.pushNotifications = pushNotifications
    this.notifications = notifications
  }

  init() {
    let io: any
    if (io === undefined) {
      io = IOServer(this.SOCKET_ADDRESS)
      this.listem(io)
    }
  }

  private push(event: string, notifications: string) {
    this.notifications = [...this.notifications, notifications]
    this.pushNotifications(this.notifications)
  }

  private listem(io: IOSocket) {
    io.on(SOCKET_KEYS.CONNECT, (socket) => {
      console.log('connected ', socket)
    })

    io.on(SOCKET_KEYS.DISCONNECT, () => {
      console.log('disconnet')
    })

    io.on(
      SOCKET_KEYS.MOBILITY_CREATE + '' + this.employeeId,
      (data: string) => {
        this.push(SOCKET_KEYS.MOBILITY_CREATE, data)
      },
    )

    io.on(SOCKET_KEYS.ABSENCE_CREATE + '' + this.employeeId, (data: any) => {
      this.push(SOCKET_KEYS.ABSENCE_CREATE, data)
    })

    io.on(SOCKET_KEYS.DOCUMENT_CREATE + '' + this.employeeId, (data: any) => {
      this.push(SOCKET_KEYS.DOCUMENT_CREATE, data)
    })

    io.on(SOCKET_KEYS.DOCUMENT_ADD + '' + this.employeeId, (data: any) => {
      this.push(SOCKET_KEYS.DOCUMENT_ADD, data)
    })

    io.on(SOCKET_KEYS.COMMENT_CREATED + '' + this.employeeId, (data: any) => {
      this.push(SOCKET_KEYS.COMMENT_CREATED, data)
    })
  }
}
