const ROUTE = new URLPattern({ pathname: "/article/:id" });
import { init_db } from './database.mjs';
import { template,make_article,make_list_page,create_article_page} from './templatepage.js'
const db = init_db();
const html_headers = {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  }
function handler(req: Request): Response {
    console.log(req.url)
    const match = ROUTE.exec(req.url);
    if (match){
        const id = match.pathname.groups.id;
        const article = db.table_query("articles",`WHERE id=${id}`)
        if (article.length==0){return new Response(template(`404`,`404`));}
        return new Response(make_article(article[0].name,article[0].content,article[0].created_at ),html_headers);
    }
    let articles;
    switch (req.url.replace('http://localhost:8000',"")) {
        case '/':
            articles = db.table_query("articles",`ORDER BY created_at DESC LIMIT 10`);
            if (articles.length==0){return new Response(template(`Недавние статьи`,`404`),html_headers);}
            return new Response(make_list_page("Недавние статьи",articles),html_headers);
        case '/contacts':
            return new Response(template(`Контакты`,`404`),html_headers);
        case '/create':
            return new Response(create_article_page(),html_headers);
        case '/allarticles':
            articles = db.table_query("articles",`ORDER BY created_at DESC`);
            if (articles.length==0){return new Response(template(`Все статьи`,`404`),html_headers);}
            return new Response(make_list_page("Все статьи",articles),html_headers);
            }
    
  return new Response("Not found (try /books/1)", {
    status: 404,
  });
}
Deno.serve(handler);