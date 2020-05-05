# Riderize Challenge

## :rocket: Running

1 - Faça o download ou clone este repositório:  

```
git clone https://github.com/SEdilson/riderize-challenge.git
cd riderize-challenge
```

2 - Instale as dependências:  

```
npm install
```

3 - Rode o banco de dados com docker-compose:  

```
docker-compose up -d
```

4 - Rode as migrações do banco:  

```
npx knex migrate:latest
```

5 - Rode a aplicação:  

```
npm run dev
```

6 - Vá para:  

```
http://localhost:3333/posts
```

7 - Para rodar os testes:  

```
npm test
```