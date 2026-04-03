# Debugging and Improvement Plan (Sharing & My Pets)

The objective is to fix the reported issues with sharing rewards, coin awarding, and persistent mock data in the My Pets tab.

## User Review Required

> [!IMPORTANT]
> **Sharing Reward Accuracy:** On many mobile devices (Android/iOS), the browser/native sharing sheet does not return whether the user *actually* completed the share or just closed the dialog. We will award coins when the dialog is dismissed without error, but we cannot strictly guarantee the share occurred.

> [!NOTE]
> **Guest Reward Message:** Currently, guest users see a success message for coins even though they don't receive any. I will update the message to be conditional on login status.

## Proposed Changes

---

### [Component] [AdoptPosterGenerator.tsx](file:///Users/kazisis/Heartpaws/mobile/components/AdoptPosterGenerator.tsx)

- **Fix Sharing Alert Timing**: Update [handleShare](file:///Users/kazisis/Heartpaws/mobile/components/AdoptPosterGenerator.tsx#60-108) to only show the success alert if sharing was initiated without error.
- **Reward Logic**: Ensure [awardCoins](file:///Users/kazisis/Heartpaws/mobile/lib/bone-coins.ts#102-169) is only called for logged-in users and its result is checked before showing the "coins awarded" message.

### [Library] [api.ts](file:///Users/kazisis/Heartpaws/mobile/lib/api.ts)

- **Fix [fetchUserPets](file:///Users/kazisis/Heartpaws/mobile/lib/api.ts#256-273)**: Replace the broken `supabase.from()` call with a functional [supabaseGet](file:///Users/kazisis/Heartpaws/mobile/lib/supabase.ts#66-95) call.
- **Fix [registerUserPet](file:///Users/kazisis/Heartpaws/mobile/lib/api.ts#274-321)**: Fix the broken function signature/syntax and ensure it uses [uploadAnimalPhoto](file:///Users/kazisis/Heartpaws/mobile/lib/api.ts#14-51) correctly.
- **Fix `deleteUserPet`**: Ensure it uses [supabaseDelete](file:///Users/kazisis/Heartpaws/mobile/lib/supabase.ts#121-142) with correct parameters.

### [Library] [bone-coins.ts](file:///Users/kazisis/Heartpaws/mobile/lib/bone-coins.ts)

- **Fix Silent Failures**: Prevent the function from returning `success: true` if the Supabase RPC fails for a logged-in user. This will prevent misleading success messages.

### [Screen] [my-pets.tsx](file:///Users/kazisis/Heartpaws/mobile/app/(tabs)/my-pets.tsx)

- **Clean up Mapping**: Ensure the mapping from DB response to UI state matches the actual column names (e.g., `photo_url`).
- **Remove Mock Remnants**: Double-check that no mock data is being injected during initialization or fetch errors.

## Verification Plan

### Automated Tests
- Check console logs for [awardCoins](file:///Users/kazisis/Heartpaws/mobile/lib/bone-coins.ts#102-169) result.
- Verify API responses for [fetchUserPets](file:///Users/kazisis/Heartpaws/mobile/lib/api.ts#256-273) in the console.

### Manual Verification
1.  **Guest Sharing**: Share as a guest and verify the message says "Thanks for sharing" (without mentioning coins).
2.  **User Sharing**: Share as a logged-in user and verify the message mentions coins AND the coin count increases.
3.  **Pet Management**: Add a pet, delete it, and refresh. Verify the list persists correctly in Supabase.
