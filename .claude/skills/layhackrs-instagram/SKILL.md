---
name: layhackrs-instagram
description: "Flujo fijo para la cuenta de Instagram @layhackrs_ (Creator, type beats en FL Studio) vía el conector Composio de Instagram. Úsalo cuando el usuario diga 'resume mis posts', 'cómo van mis reels', 'qué tal le fue al último', 'sube este video', 'publica este beat', 'prepárame el caption', 'hashtags para este beat', 'reporte de Instagram' o pegue un enlace de video/MP4 para publicar."
metadata:
  version: 1.0.0
---

# Instagram @layhackrs_ (Composio)

Cuenta: **@layhackrs_**, tipo Creator. Contenido: Reels de type beats (FL Studio), con clips de anime o videojuegos de fondo. Habla con el usuario en español, en tono cercano.

## Herramientas (conector Composio "Instagram")

Llama siempre primero a `COMPOSIO_SEARCH_TOOLS` para obtener un `session_id` y confirmar que la conexión `instagram` está ACTIVE. Si no lo está, usa `COMPOSIO_MANAGE_CONNECTIONS` y dale al usuario el enlace de autorización.

| Para | Tool slug |
|---|---|
| Perfil (seguidores, nº de posts) | `INSTAGRAM_GET_USER_INFO` (`ig_user_id: "me"`) |
| Últimos posts | `INSTAGRAM_GET_IG_USER_MEDIA` (`ig_user_id: "me"`, `limit: 10`, `fields: id,caption,media_product_type,permalink,timestamp,like_count,comments_count`) |
| Métricas de un Reel | `INSTAGRAM_GET_IG_MEDIA_INSIGHTS` (`metric: ["views","reach","saved","shares","likes","comments"]`) |
| Comentarios | `INSTAGRAM_GET_IG_MEDIA_COMMENTS` |
| Crear contenedor del Reel | `INSTAGRAM_POST_IG_USER_MEDIA` (`video_url`, `caption`, `media_type: "REELS"`, `share_to_feed: true`) |
| Publicar | `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` (`creation_id`, `max_wait_seconds: 300`) |
| Cupo de publicación | `INSTAGRAM_GET_IG_USER_CONTENT_PUBLISHING_LIMIT` |

Ejecuta las herramientas que no dependen entre sí en paralelo, con `COMPOSIO_MULTI_EXECUTE_TOOL`.

## Flujo 1 — Reporte ("resume mis posts")

1. Pide en paralelo el perfil y los últimos 10 posts. Si el usuario quiere más detalle, añade las métricas de cada Reel.
2. Entrega:
   - Una tabla con fecha, beat (con enlace al permalink), likes y comentarios.
   - Los totales y la comparación por estilo (Nujabes/boom bap, trap, otros) y por clip de fondo (Naruto, Samurai Champloo, juegos).
   - Los días que pasaron desde el último post. Si son más de 4, avísalo.
   - Entre 3 y 5 conclusiones concretas y una recomendación accionable.
3. Compara con lo que se sabe hasta ahora (ver "Lo que funciona") y actualiza esa sección si los datos cambian.

## Flujo 2 — Publicar un Reel ("sube este video")

1. **Video:** necesitas una URL HTTPS pública y directa a un MP4 (H.264 + AAC, 9:16, de 3 s a 15 min). Los enlaces de Google Drive o Dropbox para compartir no sirven tal cual: tienen que ser de descarga directa. Si el usuario no tiene la URL, pídesela o ayúdale a conseguirla.
2. **Datos:** pregunta el artista del type beat, el estilo y el clip de fondo, si no los dio.
3. **Caption:** usa el formato de la cuenta:
   ```
   <Artista> Type Beat ☁️ #flstudio #<estilo> #<anime_o_juego> #reels #layhackrs
   ```
   - Usa ☁️ para los beats chill o boom bap y 🥀 para los oscuros o melódicos.
   - Pon entre 4 y 6 hashtags. Incluye siempre `#flstudio` y `#layhackrs`.
   - Añade una pregunta corta para provocar comentarios, por ejemplo "¿Qué rapero le pondrías?". Hoy los comentarios son el punto débil de la cuenta.
   - Escribe `#` normal. No lo codifiques como `%23`.
4. **Confirmación obligatoria:** muestra el video (URL), el caption final y la hora, y espera un "sí" explícito. Nunca publiques sin él.
5. Crea el contenedor y publica con el `creation_id`. Si sale el error 9007, espera unos 20 s y reintenta la publicación. Si sale "could not be fetched", la URL no es pública o no es directa.
6. Verifica con `INSTAGRAM_GET_IG_MEDIA` usando el id publicado y pásale al usuario el permalink.

## Flujo 3 — Solo caption o ideas

Genera 2 o 3 opciones de caption con el formato de arriba y sugiere el clip de fondo según "Lo que funciona". No publiques nada.

## Lo que funciona (actualizado 2026-11-05, últimos 10 Reels)

- Los beats **Nujabes / boom bap** dominan: 665 de 812 likes (82%). Con **Naruto** de fondo sacaron 488, 101 y 67 likes; con Samurai Champloo, solo 9.
- El trap (Future, Eladio Carrión, Roddy Ricch, Gera MX) se queda entre 8 y 56 likes.
- Hay muy pocos comentarios: 13 en total.
- El ritmo habitual es un post cada 2 a 4 días. El último fue el 26 de octubre.
- La muestra es pequeña, así que trata estas conclusiones como hipótesis y revísalas con cada reporte.
