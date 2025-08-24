package web

import (
	"html/template"
	"net/http"
	"os"
	"path/filepath"
)

type Tmpls struct {
	cache map[string]*template.Template
}

func ParseTemplates(dir string) (*Tmpls, error) {
	cache := map[string]*template.Template{}

	matches, _ := filepath.Glob(filepath.Join(dir, "*.html"))

	hasIndex := false
	for _, m := range matches {
		if filepath.Base(m) == "index.html" {
			hasIndex = true
			break
		}
	}
	if !hasIndex {

		if _, err := os.Stat(filepath.Join(dir, "index.html")); err == nil {
			matches = append(matches, filepath.Join(dir, "index.html"))
		}
	}

	pages := []string{}
	for _, m := range matches {
		if filepath.Base(m) == "layout.html" {
			continue
		}
		pages = append(pages, filepath.Base(m))
	}
	if len(pages) == 0 {
		pages = []string{"index.html"}
	}

	for _, p := range pages {
		files := []string{filepath.Join(dir, "layout.html"), filepath.Join(dir, p)}
		t, err := template.ParseFiles(files...)
		if err != nil {
			return nil, err
		}
		cache[p] = t
	}
	return &Tmpls{cache: cache}, nil
}

func (t *Tmpls) Render(w http.ResponseWriter, name string, data any) error {
	if tpl, ok := t.cache[name]; ok {
		return tpl.Execute(w, data)
	}
	if tpl, ok := t.cache["index.html"]; ok {
		return tpl.Execute(w, data)
	}
	http.Error(w, "template not found", http.StatusInternalServerError)
	return nil
}
