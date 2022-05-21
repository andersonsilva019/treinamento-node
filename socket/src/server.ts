import { server } from "./http";
import './websocket/ChatService'

server.listen(3000, () => console.log('Server started on port 3000'));