#!/bin/bash
# Heartpaws Supabase Keep-Alive Script
API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicHpzd2Rxa3NudXh4b3VlbGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTEyMDksImV4cCI6MjA4NzQ4NzIwOX0.NVHtxpAnH78iwZt1w03TB25xSDMG5XVasUkcoaSTb8Q"
URL="https://lbpzswdqksnuxxouelad.supabase.co/rest/v1/shelters?select=id&limit=1"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "apikey: $API_KEY" -H "Authorization: Bearer $API_KEY" "$URL")
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Supabase Ping Status: $STATUS"
