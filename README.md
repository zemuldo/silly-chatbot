# silly-chatbot

URL: `wss://z-silly-chatbot.herokuapp.com/`

## Get session

### Message

```json
{"type": "login"}
```

### Response

```json
{"type":"sessionId","msg":"76603943-e974-40d2-981a-651df299950f"}
```

## Send a chat message

### Chat Message

```json
{"type": "chat", "msg": "Hello", "sessionId": "76603943-e974-40d2-981a-651df299950f"}
```

### Chat Response

```json
{"msg":"Hello! How can I help you?"}
```
