console.log("Racing Limits MSGames");

let interstitial = null;
let rewarded = null;

function __msstart() {
  try {
    return typeof window !== "undefined" ? window.$msstart : null;
  } catch (e) {
    return null;
  }
}

function __sendMessage(objName, methodName) {
  try {
    if (!gameInstance) return;
    if (typeof gameInstance.SendMessage !== "function") return;
    gameInstance.SendMessage(objName, methodName);
  } catch (e) {}
}

function loadAds() {
  console.log("[MSDR] Load ads");
  if (!__msstart()) return;
  loadInterstitial();
  loadRewarded();
}

function loadInterstitial() {
  interstitial = null;
  const ms = __msstart();
  if (!ms || typeof ms.loadAdsAsync !== "function") return;
  ms
    .loadAdsAsync()
    .then((adInstance) => {
      interstitial = adInstance;
      console.log("[MSDR] Interstitial ad loaded!");
      __sendMessage("SBKMSAds", "OnInterstitialAdLoaded");
    })
    .catch((e) => {
      console.error(
        `[MSDR] Error loading interstitial: ${JSON.stringify(
          e
        )}. Retrying in 15s`
      );
      __sendMessage("SBKMSAds", "OnInterstitialAdLoadFailed");
      setTimeout(loadInterstitial, 15000);
    });
}

function loadRewarded() {
  rewarded = null;
  const ms = __msstart();
  if (!ms || typeof ms.loadAdsAsync !== "function") return;
  ms
    .loadAdsAsync(true)
    .then((adInstance) => {
      rewarded = adInstance;
      console.log("[MSDR] Rewarded ad loaded!");
      __sendMessage("SBKMSAds", "OnRewardedAdLoaded");
    })
    .catch((e) => {
      console.error(
        `[MSDR] Error loading rewarded: ${JSON.stringify(e)}. Retrying in 15s`
      );
      __sendMessage("SBKMSAds", "OnRewardedAdLoadFailed");
      setTimeout(loadRewarded, 15000);
    });
}

function showInterstitial() {
  console.log("[MSDR] Show interstital");
  const ms = __msstart();
  if (!ms || typeof ms.showAdsAsync !== "function") {
    __sendMessage("SBKMSAds", "OnInterstitialAdShowError");
    return;
  }

  if (!interstitial) {
    __sendMessage("SBKMSAds", "OnInterstitialAdShowError");
    return;
  }

  ms
    .showAdsAsync(interstitial.instanceId)
    .then((adInstance) => {
      __sendMessage("SBKMSAds", "OnInterstitialAdStarted");
      adInstance.showAdsCompletedAsync
        .then(() => {
          __sendMessage("SBKMSAds", "OnInterstitialAdClose");
        })
        .catch((e) => {
          console.error(
            "[MSDR] Error interstitial showAdsCompletedAsync: ",
            JSON.stringify(e)
          );
          __sendMessage("SBKMSAds", "OnInterstitialAdShowError");
        })
        .finally(() => {
          loadInterstitial();
        });
    })
    .catch((e) => {
      console.error("[MSDR] Error show interstitial ad: ", JSON.stringify(e));
      __sendMessage("SBKMSAds", "OnInterstitialAdShowError");
      loadInterstitial();
    });
}

function showRewarded() {
  console.log("[MSDR] Show rewarded");
  const ms = __msstart();
  if (!ms || typeof ms.showAdsAsync !== "function") {
    __sendMessage("SBKMSAds", "OnRewardedAdShowError");
    return;
  }

  if (rewarded == null) {
    __sendMessage("SBKMSAds", "OnRewardedAdShowError");
    return;
  }

  ms
    .showAdsAsync(rewarded.instanceId)
    .then((adInstance) => {
      __sendMessage("SBKMSAds", "OnRewardedAdStarted");
      adInstance.showAdsCompletedAsync
        .then(() => {
          __sendMessage("SBKMSAds", "OnRewardedAdShowSuccess");
        })
        .catch((e) => {
          console.error(
            "[MSDR] Error rewarded showAdsCompletedAsync: ",
            JSON.stringify(e)
          );
          __sendMessage("SBKMSAds", "OnRewardedAdShowError");
        })
        .finally(() => {
          loadRewarded();
        });
    })
    .catch((e) => {
      console.error("[MSDR] Error show rewarded ad: ", JSON.stringify(e));
      __sendMessage("SBKMSAds", "OnRewardedAdShowError");
      loadRewarded();
    });
}

function showBanner() {
  console.log("[MSDR] Show banner");
  const ms = __msstart();
  if (!ms || typeof ms.showDisplayAdsAsync !== "function") return;
  ms
    .showDisplayAdsAsync("top:320x50")
    .then((response) => {
      console.log("[MSDR] " + response);
    })
    .catch((e) => {
      console.error("[MSDR] Error show banner ad: ", JSON.stringify(e));
    });
}

// function showBanner(position) {
//   console.log("[MSDR] Show banner");
//   $msstart
//     .showDisplayAdsAsync(position)
//     .then((response) => {
//       console.log("[MSDR] " + response);
//     })
//     .catch((e) => {
//       console.error("[MSDR] Error show banner ad: ", JSON.stringify(e));
//     });
// }

function hideBanner() {
  console.log("[MSDR] Hide banner");
  const ms = __msstart();
  if (!ms || typeof ms.hideDisplayAdsAsync !== "function") return;
  ms
    .hideDisplayAdsAsync()
    .then((response) => {
      console.log("[MSDR] " + response);
    })
    .catch((e) => {
      console.error("[MSDR] Error show banner ad: ", JSON.stringify(e));
    });
}
