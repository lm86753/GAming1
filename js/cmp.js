window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('consent','default',{
  ad_storage:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted'
});

function setConsent(consent){
  gtag('consent','update',{
    ad_storage: consent.ads ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    functionality_storage: consent.functionality ? 'granted' : 'denied',
    personalization_storage: consent.personalization ? 'granted' : 'denied',
    security_storage:'granted'
  });
  localStorage.setItem('cmp_consent',JSON.stringify(consent));
}

function showBanner(){
  var style=document.createElement('style');
  style.textContent=
    '#cmp-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;justify-content:center;z-index:9999}' +
    '#cmp-banner{background:#1f2937;color:#fff;width:100%;max-width:840px;margin:20px;border-radius:12px;padding:16px;box-shadow:0 10px 30px rgba(0,0,0,.35)}' +
    '#cmp-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:12px}' +
    '.cmp-btn{cursor:pointer;border:none;border-radius:10px;padding:10px 16px;font-size:14px}' +
    '.cmp-primary{background:#22c55e;color:#fff}' +
    '.cmp-secondary{background:#374151;color:#fff}' +
    '#cmp-modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:10000;background:rgba(0,0,0,.6)}' +
    '#cmp-panel{background:#111827;color:#fff;width:100%;max-width:560px;border-radius:12px;padding:16px}' +
    '.cmp-row{display:flex;align-items:center;justify-content:space-between;margin:8px 0}' +
    '.cmp-save{background:#22c55e;color:#fff}';
  document.head.appendChild(style);

  var backdrop=document.createElement('div');
  backdrop.id='cmp-backdrop';
  var banner=document.createElement('div');
  banner.id='cmp-banner';
  var msg=document.createElement('div');
  msg.textContent='We use cookies and similar technologies to deliver and measure personalized ads and analytics. Choose Consent to allow all, or Manage to select preferences.';
  var actions=document.createElement('div');
  actions.id='cmp-actions';
  var btnConsent=document.createElement('button');
  btnConsent.className='cmp-btn cmp-primary';
  btnConsent.textContent='Consent';
  var btnManage=document.createElement('button');
  btnManage.className='cmp-btn cmp-secondary';
  btnManage.textContent='Manage';
  actions.appendChild(btnManage);
  actions.appendChild(btnConsent);
  banner.appendChild(msg);
  banner.appendChild(actions);
  backdrop.appendChild(banner);
  document.body.appendChild(backdrop);

  var modal=document.createElement('div');
  modal.id='cmp-modal';
  var panel=document.createElement('div');
  panel.id='cmp-panel';
  var h=document.createElement('div');
  h.textContent='Privacy Preferences';
  var rows=[
    {key:'ads',label:'Ads'},
    {key:'analytics',label:'Analytics'},
    {key:'functionality',label:'Site functionality'},
    {key:'personalization',label:'Personalization'}
  ];
  var state={ads:false,analytics:false,functionality:false,personalization:false};
  rows.forEach(function(r){
    var row=document.createElement('div');
    row.className='cmp-row';
    var label=document.createElement('span');
    label.textContent=r.label;
    var input=document.createElement('input');
    input.type='checkbox';
    input.onchange=function(){state[r.key]=input.checked;};
    row.appendChild(label);
    row.appendChild(input);
    panel.appendChild(row);
  });
  var actions2=document.createElement('div');
  actions2.style.display='flex';
  actions2.style.justifyContent='flex-end';
  actions2.style.gap='10px';
  actions2.style.marginTop='12px';
  var close=document.createElement('button');
  close.className='cmp-btn cmp-secondary';
  close.textContent='Cancel';
  var save=document.createElement('button');
  save.className='cmp-btn cmp-save';
  save.textContent='Save';
  actions2.appendChild(close);
  actions2.appendChild(save);
  panel.insertBefore(h,panel.firstChild);
  panel.appendChild(actions2);
  modal.appendChild(panel);
  document.body.appendChild(modal);

  btnConsent.onclick=function(){
    setConsent({ads:true,analytics:true,functionality:true,personalization:true});
    backdrop.remove();
    modal.style.display='none';
  };
  btnManage.onclick=function(){
    modal.style.display='flex';
  };
  close.onclick=function(){
    modal.style.display='none';
  };
  save.onclick=function(){
    setConsent(state);
    backdrop.remove();
    modal.style.display='none';
  };

  window.openCMP=function(){modal.style.display='flex';};
}

document.addEventListener('DOMContentLoaded',function(){
  var saved=localStorage.getItem('cmp_consent');
  if(saved){
    try{
      var c=JSON.parse(saved);
      setConsent(c);
    }catch(e){
      showBanner();
    }
  }else{
    showBanner();
  }
});
