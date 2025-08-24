package main

import (
    "log"
    "net/http"
    "os"

    "github.com/chudoboy/web-rokky-go2/internal/db"
    "github.com/chudoboy/web-rokky-go2/internal/repo"
    "github.com/chudoboy/web-rokky-go2/internal/web"
)

func main() {
    addr := getEnv("ADDR", ":8080")
    dbPath := getEnv("DB_PATH", "data/app.db")

    if err := os.MkdirAll("data", 0o755); err != nil { log.Fatal(err) }

    sqlDB, err := db.Open(dbPath)
    if err != nil { log.Fatal(err) }
    if err := db.SeedIfEmpty(sqlDB); err != nil { log.Fatal(err) }

    repository := repo.New(sqlDB)
    tmpls, err := web.ParseTemplates("templates")
    if err != nil { log.Fatal(err) }

    srv := &web.Server{Repo: repository, Tmpl: tmpls}

    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
    http.HandleFunc("/", srv.Home)
    http.HandleFunc("/portfolio", srv.Portfolio)
    http.HandleFunc("/sites/{slug}", srv.SiteDetail)
    http.HandleFunc("/prices", srv.Prices)

    log.Printf("listening on %s", addr)
    log.Fatal(http.ListenAndServe(addr, nil))
}

func getEnv(k, def string) string {
    if v := os.Getenv(k); v != "" { return v }
    return def
}
