---
name: layhackrs-instagram
description: "Marketing y crecimiento para la cuenta de Instagram @layhackrs_ (Creator, type beats en FL Studio) vía el conector Composio de Instagram. El usuario publica él mismo; Claude analiza y prepara. Úsalo cuando diga 'resume mis posts', 'cómo van mis reels', 'qué tal le fue al último', 'voy a subir un beat', 'prepárame el caption', 'hashtags para este beat', 'cómo crezco', 'mejora mi perfil' o 'reporte de Instagram'."
metadata:
  version: 1.1.0
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

## Flujo 2 — Antes de publicar ("voy a subir un beat")

El usuario publica él mismo desde la app. **No publiques desde aquí** a menos que lo pida explícitamente; si lo pide, usa `INSTAGRAM_POST_IG_USER_MEDIA` + `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` con una URL pública directa del MP4 y confirmación previa.

Entrega un "paquete de publicación":
1. **Gancho (primeros 3 s):** es la métrica que decide todo (ver "Lo que funciona"). Sugiere arrancar directo en el drop, el 808 o el sample más fuerte, sin intro silenciosa, y un texto en pantalla corto ("POV: Nujabes produciendo para Naruto").
2. **Clip de fondo** recomendado según los datos.
3. **Caption** con el formato de la cuenta:
   ```
   <Artista> Type Beat ☁️ #flstudio #<estilo> #<anime_o_juego> #reels #layhackrs
   ```
   - ☁️ chill/boom bap, 🥀 oscuro/melódico. 4–6 hashtags, siempre `#flstudio` y `#layhackrs`.
   - Cierra con una pregunta corta o un CTA ("¿Qué rapero le pondrías?", "Comenta 🔥 si lo quieres completo").
4. **Checklist:** vertical 9:16, el audio arranca fuerte, portada legible, comentario fijado propio con CTA.

## Flujo 2b — Revisión a las 24–72 h ("¿cómo le fue al último?")

Saca las métricas del último Reel (`views`, `reach`, `saved`, `shares`, `ig_reels_avg_watch_time`, `reels_skip_rate`) y compáralas con la mediana de la cuenta. Di en una frase por qué crees que funcionó o no, y qué cambiar en el siguiente.

## Flujo 3 — Solo caption o ideas

Genera 2 o 3 opciones de caption con el formato de arriba y sugiere el clip de fondo según "Lo que funciona". No publiques nada.

## Lo que funciona (actualizado 2026-11-05, últimos 10 Reels)

| Reel | Views | Skip 3 s | Watch prom. |
|---|---|---|---|
| Nujabes + Naruto (12 oct) | 38 457 | 28 % | 15.5 s |
| Nujabes + Naruto (26 oct) | 3 160 | 43 % | 8.4 s |
| Nujabes + Naruto (14 oct) | 2 660 | 40 % | 10.4 s |
| Future x Southside (30 sep / 4 oct) | ~1 450 | 43–48 % | ~9.4 s |
| Roddy Ricch / Nujabes + Champloo | ~1 250 | 42–47 % | 6–7 s |
| Future x 808mafia, Eladio, Gera MX | 216–354 | 52–75 % | ~5.7 s |

- **El skip rate de los primeros 3 s es lo que más pesa.** Debajo de ~30 % el Reel explota; por encima de ~50 % se muere en menos de 400 views. Optimiza el gancho antes que cualquier otra cosa.
- **Nujabes / boom bap + Naruto** es la fórmula ganadora (82 % de los likes, 87 % de las views).
- **El gran hueco es la conversión:** ~50 000 views en 10 Reels, pero solo 55 seguidores. Pocos guardados (≤26) y compartidos (≤17). Prioriza el perfil (bio, enlace, destacados) y los CTA.
- El ritmo habitual es un post cada 2 a 4 días.
- La muestra es pequeña: trata esto como hipótesis y actualiza la tabla con cada reporte.
