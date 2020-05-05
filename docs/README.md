# Post

## Adicionando post
Endpoint para criação de posts.

| **Rota**            | /api/v1/posts     |
|-----------------------|:---------------------:|
| **Tipo da Requisição**         | POST                   |
| **Corpo da Requisição**   | `"nomeUsuario": "Rafael Henrique", "avatar": "http://foo.com/blah_blah", "urlImagemPublicacao": "http://foo.com/imagem_publicada"}` |
| **Resposta**  | `{"nomeUsuario": "Rafael Henrique", "avatar": "http://foo.com/blah_blah", "dataPublicacao": "2020-05-05T14:22:00.711Z", "urlImagemPublicacao": "http://foo.com/imagem_publicada"}` |


## Listando posts
Endpoint para a listagem dos posts.

| **Rota**            | /api/v1/posts     |
|-----------------------|:---------------------:|
| **Tipo da Requisição**         | GET                   |
| **Custom Header**         | X-Total-Count                   |
| **Resposta**  | `{[{"id": "4a46adcf-63ee-495c-955d-7d82cda8c245", "nomeUsuario": "Maria Silva", "avatar": "http://foo.com/blah_blah", "dataPublicacao": "2020-05-05T03:00:00.000Z", "urlImagemPublicacao": "http://foo.com/blah_blah"}]}` |


## Buscando post pelo ID
Endpoint para buscar post pelo ID.

| **Rota**            | /api/v1/posts/4a46adcf-63ee-495c-955d-7d82cda8c245     |
|-----------------------|:---------------------:|
| **Tipo da Requisição**         | GET                   |
| **Resposta**  | `{"id": "4a46adcf-63ee-495c-955d-7d82cda8c245", "nomeUsuario": "Maria Silva", "avatar": "http://foo.com/blah_blah", "dataPublicacao": "2020-05-05T03:00:00.000Z", "urlImagemPublicacao": "http://foo.com/blah_blah"}` |


## Atualizando post
Endpoint para atualizar post.

| **Rota**            | /api/v1/posts/4a46adcf-63ee-495c-955d-7d82cda8c245     |
|-----------------------|:---------------------:|
| **Tipo da Requisição**         | PUT                   |
| **Corpo da Requisição**   | `"nomeUsuario": "Camila Miranda", "avatar": "http://linklegal.com/avatar_usuario", "urlImagemPublicacao": "http://linkmassa.com/imagem_publicada"}` |
| **Resposta**  | `{"id": "4a46adcf-63ee-495c-955d-7d82cda8c245", "nomeUsuario": "Camila Miranda", "avatar": "http://linklegal.com/avatar_usuario", "dataPublicacao": "2020-05-05T03:00:00.000Z", "urlImagemPublicacao": "http://linkmassa.com/imagem_publicada"}` |


## Deletando post
Endpoint para deletar post.

| **Rota**            | /api/v1/posts/4a46adcf-63ee-495c-955d-7d82cda8c245     |
|-----------------------|:---------------------:|
| **Tipo da Requisição**         | DELETE                   |