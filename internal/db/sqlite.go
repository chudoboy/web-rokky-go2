package db

import (
	"context"
	"database/sql"
	"embed"
	"fmt"
	"time"

	_ "modernc.org/sqlite"
)

var schemaFS embed.FS

func Open(path string) (*sql.DB, error) {
	dsn := fmt.Sprintf("file:%s?_pragma=foreign_keys(1)", path)
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}
	if err := migrate(db); err != nil {
		return nil, err
	}
	return db, nil
}

func migrate(db *sql.DB) error {
	b, err := schemaFS.ReadFile("schema.sql")
	if err != nil {
		return err
	}
	_, err = db.Exec(string(b))
	return err
}

func SeedIfEmpty(db *sql.DB) error {
	var n int
	if err := db.QueryRow("select count(1) from sites").Scan(&n); err != nil {
		return err
	}
	if n == 0 {
		if _, err := db.Exec(`
			insert into sites(title,slug,description,url,image) values
			('Friday','friday','Web app','/static/Friday/index.html','/static/img/friday.svg'),
			('Exile','exile','Косметика','/static/exile/index.html','/static/img/exile.svg'),
			('Zap Token','zap-token','Crypto','/static/Crypto_sait/index.html','/static/img/zap.svg');
		`); err != nil {
			return err
		}
	}

	if err := db.QueryRow("select count(1) from prices").Scan(&n); err != nil {
		return err
	}
	if n > 0 {
		return nil
	}

	res, err := db.Exec(`
		insert into prices(name,description,amount,currency,sort,image_main,image_bg,variant)
		values(?,?,?,?,?,?,?,?)
	`, "Сайт под ключ",
		"Популярный вариант который подойдет для\nкаждего пользователя.",
		10000, "RUB", 10,
		"/static/img/global.svg",
		"/static/img/global-price-gray.svg",
		"price1",
	)
	if err != nil {
		return err
	}
	siteID, _ := res.LastInsertId()
	if _, err = db.Exec(`
		insert into price_features(price_id,icon,text,sort) values
		(?,?,?,10),(?,?,?,20),(?,?,?,30),(?,?,?,40)
	`,
		siteID, "/static/img/designtools.svg", "Разработка дизайна с нуля",
		siteID, "/static/img/devices.svg", "Верстка и настройка",
		siteID, "/static/img/shield-tick.svg", "Защита сайта",
		siteID, "/static/img/cloud-add.svg", "Выход на хостинг",
	); err != nil {
		return err
	}

	res, err = db.Exec(`
		insert into prices(name,description,amount,currency,sort,image_main,image_bg,variant)
		values(?,?,?,?,?,?,?,?)
	`, "Telegram bot",
		"Создаем дизайн для любой направленности\nкоторая вам нужна.",
		7000, "RUB", 20,
		"/static/img/tgbot.svg",
		"/static/img/github-action.svg",
		"price2",
	)
	if err != nil {
		return err
	}
	botID, _ := res.LastInsertId()
	if _, err = db.Exec(`
		insert into price_features(price_id,icon,text,sort) values
		(?,?,?,10),(?,?,?,20),(?,?,?,30),(?,?,?,40)
	`,
		botID, "/static/img/key.svg", "Бот под ключ",
		botID, "/static/img/data-2.svg", "Настройка",
		botID, "/static/img/hierarchy-square-3.svg", "Web App",
		botID, "/static/img/programming-arrows.svg", "Оптимизация",
	); err != nil {
		return err
	}

	res, err = db.Exec(`
		insert into prices(name,description,amount,currency,sort,image_main,image_bg,variant)
		values(?,?,?,?,?,?,?,?)
	`, "Дизайн",
		"Создаем дизайн для любой направленности\nкоторая вам нужна.",
		4000, "RUB", 30,
		"/static/img/bucket.svg",
		"/static/img/brush.svg",
		"price3",
	)
	if err != nil {
		return err
	}
	designID, _ := res.LastInsertId()
	if _, err = db.Exec(`
		insert into price_features(price_id,icon,text,sort) values
		(?,?,?,10),(?,?,?,20),(?,?,?,30),(?,?,?,40)
	`,
		designID, "/static/img/pen-tool.svg", "Уникальный дизайн",
		designID, "/static/img/brush-4.svg", "Подборка цветов",
		designID, "/static/img/mobile.svg", "Адаптивный дизайн",
		designID, "/static/img/refresh-2.svg", "Правки включены",
	); err != nil {
		return err
	}

	return nil
}
