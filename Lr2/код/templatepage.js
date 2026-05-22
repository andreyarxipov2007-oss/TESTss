
export const template = (title, content) => `
  <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Simple App</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, system-ui, sans-serif;
            background-color: #f0f8ff;
            color: #333;
        }

        /* Верхняя панель */
        .top-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px; /* Примерно 1.5 см */
            background-color: #e1efff; /* Чуть темнее основного фона */
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 5px rgba(0,0,0,0.05);
            z-index: 50;
        }

        .page-title {
            font-weight: 600;
            color: #007bff;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
        }

        /* Навигация */
        .nav-container {
            position: fixed;
            top: 5px; /* Внутри top-bar */
            left: 10px;
            z-index: 100;
        }

        .menu-icon {
            width: 40px;
            height: 40px;
            background-color: #007bff;
            position: relative;
            cursor: pointer;
            transition: all 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }

        .menu-icon::before, .menu-icon::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 2px;
            background-color: white;
            transition: all 0.4s ease;
        }

        .menu-icon::before { transform: rotate(45deg); }
        .menu-icon::after { transform: rotate(-45deg); }

        .menu-list {
            position: absolute;
            top: 50px;
            left: 0;
            background-color: white;
            list-style: none;
            padding: 5px 0;
            margin: 0;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-radius: 12px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            min-width: 180px;
        }

        .menu-list li a {
            display: block;
            padding: 15px 20px;
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
        }

        /* Ховер и фокус для мобилок */
        .nav-container:hover .menu-icon, 
        .nav-container:focus-within .menu-icon {
            transform: rotate(180deg);
            border-radius: 2px;
        }

        .nav-container:hover .menu-icon::before, .nav-container:hover .menu-icon::after,
        .nav-container:focus-within .menu-icon::before, .nav-container:focus-within .menu-icon::after {
            width: 0;
            opacity: 0;
        }

        .nav-container:hover .menu-list,
        .nav-container:focus-within .menu-list {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        /* Основной контент */
        .content {
            padding: 80px 20px 20px;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        #recent {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            margin-top: 20px;
            text-align: left;
        }

        .article-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 20px;
            border-bottom: 1px solid #f0f8ff;
        }

        .article-row:last-child { border: none; }

        .article-row a {
            color: #007bff;
            text-decoration: none;
            font-weight: 600;
        }

        .article-row span:last-child {
            color: #888;
            font-size: 0.85em;
        }

        @media (max-width: 400px) {
            .article-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>

    <header class="top-bar">
        <div class="page-title">${title}</div>
    </header>

    <div class="nav-container" tabindex="0">
        <div class="menu-icon"></div>
        <ul class="menu-list">
            <li><a href="/">Главная</a></li>
            <li><a href="/contacts">Контакты</a></li>
            <li><a href="/create">Написать статью</a></li>
            <li><a href="/allarticles">Все статьи</a></li>
        </ul>
    </div>
    <main class="content">
        ${content}
    </main>

</body>
</html>
`;
export const recent_arts = (title,articles) => `
        <h2>${title}</h2>
        <div id="recent">
            ${articles}
        </div>`;
export function make_list(arts_query){
    let articles = ``;
    for (const row of arts_query){
        console.log(row)
        articles += `<div class="article-row">
                <span><a href="/article/${row.id}">${row.name}</a></span>
                <span>${row.created_at}</span>
            </div>`
    }
    return articles;
}
export function make_list_page(listname="Недавние статьи",arts_query){
    return template(listname,recent_arts(listname,make_list(arts_query)));
}
export function make_article(name,content,created_at){
    return template(name,`
        <h2>${name}.    ${created_at}</h2>
        <div id="content">
            ${content}
        </div>`)
}

export function create_article_page(){
    return template("Создание статьи",`
        <h2>Тут можно создать собственную статью</h2>
        <div id="content">
            <form>
                <div>
                <label for="title">Название статьи</label><br>
                <input type="text" id="title" name="title" style="width: 100%; margin-bottom: 15px;">
                </div>
                <div>
                <label for="content">Содержание</label><br>
                <textarea id="content" name="content" rows="10" style="width: 100%;"></textarea>
                </div>
                <button type="submit" style="margin-top: 10px;">Опубликовать</button>
            </form>
        </div>`)
}