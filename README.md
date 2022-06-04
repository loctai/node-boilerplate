# BACK END

To run this app configure MongoDB url & JWT Secret in the [.env.development](./.env.development):

```
MONGODB_CLUSTER_URL={{mongodb}}
JWT_SECRET={{SOME_VALUE}}
NODEMAILER_EMAIL={{SOME_VALUE}}
NODEMAILER_IMAP_PASSWORD={{SOME_VALUE}}
```

And run next commands:

```bash
npm run i
npm run dev
```

Finally, you can open next url-s:
- [http://localhost:5050](http://localhost:5050) with your browser to see the result.
- [http://localhost:5050/swagger](http://localhost:5050/swagger) with your browser to see Swagger documentation.

