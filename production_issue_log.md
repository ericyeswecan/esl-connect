# Production Deployment Status & Issues

## Current URL
[https://eslconnect-asia.pages.dev](https://eslconnect-asia.pages.dev)

## Latest Issue: Toss Payments Live Key "먹통" (Unresponsive)
- **Status**: The user is unable to use `live_ck_`. This is typically due to the "계약 및 심사" (Contract & Screening) process not being completed in the Toss console.
- **Interim Solution**: Switching the production site to **Test Mode** to verify the backend logic (Cloudflare Functions + Supabase) works correctly.

## Required Setup for Live
1. **Toss Console**: Complete contract and obtain `live_ck_` and `live_sk_`.
2. **Cloudflare**: 
   - Set `TOSS_SECRET_KEY` to the **Live** Secret Key (`live_sk_...`).
   - Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. **Whitelist**: Ensure `eslconnect-asia.pages.dev` is registered in Toss console.

## Verified Fixes
- [x] Service Worker disabled to fix `ERR_FAILED`.
- [x] Manual Git import successful.
- [x] Backend functions live and reachable.
