package models

import "time"

type Site struct {
	ID          int64
	Title       string
	Slug        string
	Description string
	URL         string
	Image       string
	CreatedAt   time.Time
}

type PriceFeature struct {
	ID      int64
	PriceID int64
	Icon    string
	Text    string
	Sort    int
}

type Price struct {
	ID          int64
	Name        string
	Description string
	Amount      int64
	Currency    string
	Sort        int
	ImageMain   string
	ImageBg     string
	Variant     string
	CreatedAt   time.Time

	Features []PriceFeature
}
