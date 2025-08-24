package web

import (
	"context"
	"net/http"
	"time"

	"github.com/chudoboy/web-rokky-go2/internal/repo"
)

type Server struct {
	Repo *repo.Repository
	Tmpl *Tmpls
}

func (s *Server) withTimeout() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 2*time.Second)
}

func (s *Server) Home(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := s.withTimeout()
	defer cancel()

	sites, _ := s.Repo.AllSites(ctx)
	prices, _ := s.Repo.AllPricesWithFeatures(ctx)

	_ = s.Tmpl.Render(w, "index.html", map[string]any{
		"Sites":  sites,
		"Prices": prices,
	})
}

func (s *Server) Portfolio(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/#port", http.StatusFound)
}

func (s *Server) Prices(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/#tarif", http.StatusFound)
}

func (s *Server) SiteDetail(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/", http.StatusFound)
}
