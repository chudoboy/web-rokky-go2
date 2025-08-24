package repo

import (
	"context"
	"database/sql"
	"time"

	"github.com/chudoboy/web-rokky-go2/internal/models"
)

type Repository struct{ DB *sql.DB }

func New(DB *sql.DB) *Repository { return &Repository{DB: DB} }

func (r *Repository) AllSites(ctx context.Context) ([]models.Site, error) {
	rows, err := r.DB.QueryContext(ctx, `
		select id, title, slug, description, url, image, created_at
		from sites
		order by created_at desc
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Site
	for rows.Next() {
		var s models.Site
		var t time.Time
		if err := rows.Scan(&s.ID, &s.Title, &s.Slug, &s.Description, &s.URL, &s.Image, &t); err != nil {
			return nil, err
		}
		s.CreatedAt = t
		out = append(out, s)
	}
	return out, rows.Err()
}

func (r *Repository) SiteBySlug(ctx context.Context, slug string) (models.Site, error) {
	var s models.Site
	var t time.Time
	err := r.DB.QueryRowContext(ctx, `
		select id, title, slug, description, url, image, created_at
		from sites
		where slug = ?
	`, slug).Scan(&s.ID, &s.Title, &s.Slug, &s.Description, &s.URL, &s.Image, &t)
	if err != nil {
		return s, err
	}
	s.CreatedAt = t
	return s, nil
}

func (r *Repository) AllPrices(ctx context.Context) ([]models.Price, error) {
	rows, err := r.DB.QueryContext(ctx, `
		select id, name, description, amount, currency, sort, image_main, image_bg, variant, created_at
		from prices
		order by sort asc, id asc
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Price
	for rows.Next() {
		var p models.Price
		var t time.Time
		if err := rows.Scan(
			&p.ID, &p.Name, &p.Description, &p.Amount, &p.Currency, &p.Sort,
			&p.ImageMain, &p.ImageBg, &p.Variant, &t,
		); err != nil {
			return nil, err
		}
		p.CreatedAt = t
		out = append(out, p)
	}
	return out, rows.Err()
}

func (r *Repository) AllPricesWithFeatures(ctx context.Context) ([]models.Price, error) {

	rows, err := r.DB.QueryContext(ctx, `
		select id, name, description, amount, currency, sort, image_main, image_bg, variant, created_at
		from prices
		order by sort asc, id asc
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var prices []models.Price
	for rows.Next() {
		var p models.Price
		var t time.Time
		if err := rows.Scan(
			&p.ID, &p.Name, &p.Description, &p.Amount, &p.Currency, &p.Sort,
			&p.ImageMain, &p.ImageBg, &p.Variant, &t,
		); err != nil {
			return nil, err
		}
		p.CreatedAt = t
		prices = append(prices, p)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	if len(prices) == 0 {
		return prices, nil
	}

	for i := range prices {
		frows, err := r.DB.QueryContext(ctx, `
			select id, price_id, icon, text, sort
			from price_features
			where price_id = ?
			order by sort asc, id asc
		`, prices[i].ID)
		if err != nil {
			return nil, err
		}
		var feats []models.PriceFeature
		for frows.Next() {
			var f models.PriceFeature
			if err := frows.Scan(&f.ID, &f.PriceID, &f.Icon, &f.Text, &f.Sort); err != nil {
				frows.Close()
				return nil, err
			}
			feats = append(feats, f)
		}
		frows.Close()
		prices[i].Features = feats
	}

	return prices, nil
}
