import { useState, useRef } from "react";

const DOG_IMGS = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80",
];
const CAT_IMGS = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80",
];

const SAMPLE_DATA = {
  sighting: [
    { id:1, species:"강아지", breed:"믹스견", location:"수원시 영통구 매탄동", time:"2시간 전",
      desc:"갈색 소형견, 목줄 없음. 편의점 앞에서 배회 중입니다. 간식 줬더니 먹었어요.",
      contact:"010-1234-5678", urgent:true, status:"미해결", images:[DOG_IMGS[0], DOG_IMGS[1]] },
    { id:2, species:"고양이", breed:"코숏", location:"수원시 팔달구 화서동", time:"5시간 전",
      desc:"흰색 고양이, 오른쪽 귀에 상처. 주차장에서 울고 있었어요.",
      contact:"010-9876-5432", urgent:false, status:"미해결", images:[CAT_IMGS[0]] },
    { id:3, species:"강아지", breed:"포메라니안", location:"수원시 권선구 권선동", time:"어제",
      desc:"아이보리색 포메, 리본 달린 목걸이. 공원 근처에서 봤습니다.",
      contact:"010-5555-1111", urgent:false, status:"해결됨", images:[DOG_IMGS[2], DOG_IMGS[3]] },
  ],
  find: [
    { id:4, species:"강아지", breed:"골든리트리버", location:"수원시 장안구", time:"3일 전",
      desc:"이름: 망고. 2살 수컷. 노란 하네스 착용. 2월 20일 오후 2시 실종. 제발 연락주세요 🙏",
      contact:"010-2222-3333", reward:"사례금 있음", urgent:true, status:"미해결", images:[DOG_IMGS[1], DOG_IMGS[3]] },
    { id:5, species:"고양이", breed:"러시안블루", location:"수원시 영통구", time:"1주일 전",
      desc:"이름: 두부. 3살 암컷. 중성화 O. 회색 털, 초록 눈. 실내묘라 매우 위험합니다.",
      contact:"010-7777-8888", reward:"없음", urgent:true, status:"미해결", images:[CAT_IMGS[1], CAT_IMGS[2]] },
  ],
  foster: [
    { id:6, species:"강아지", breed:"치와와 추정", location:"수원시 팔달구", time:"오늘",
      desc:"2개월 예정. 건강검진 완료. 밥·모래·패드 제공. 입양 의사 있으신 분도 환영!",
      contact:"010-3333-4444", period:"2개월", urgent:false, status:"모집중", images:[DOG_IMGS[0], DOG_IMGS[2]] },
    { id:7, species:"고양이", breed:"터키시앙고라", location:"서울시 강남구", time:"2일 전",
      desc:"구조된 새끼 고양이 3마리. 약 5주령. 포뮬러 수유 필요. 경험자 우대.",
      contact:"010-6666-9999", period:"입양까지", urgent:true, status:"모집중", images:[CAT_IMGS[3], CAT_IMGS[0], CAT_IMGS[2]] },
  ],
};

const TABS = [
  { id:"sighting", label:"목격 제보", icon:"👀" },
  { id:"find",     label:"찾아요",   icon:"🔍" },
  { id:"foster",   label:"임시보호", icon:"🏠" },
];

function Carousel({ images, height = 200 }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };
  return (
    <div style={{ position:"relative", width:"100%", height:`${height}px`, background:"#f5ede6", overflow:"hidden" }}>
      <img src={images[idx]} alt="동물 사진" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"opacity 0.25s" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.32) 100%)" }} />
      {images.length > 1 && (
        <>
          {[{fn:prev, side:"left", ch:"‹"}, {fn:next, side:"right", ch:"›"}].map(({fn, side, ch}) => (
            <button key={side} onClick={fn} style={{
              position:"absolute", [side]:"10px", top:"50%", transform:"translateY(-50%)",
              background:"rgba(255,255,255,0.88)", border:"none", borderRadius:"50%",
              width:"32px", height:"32px", cursor:"pointer", fontSize:"18px", lineHeight:1,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 2px 8px rgba(0,0,0,0.18)", color:"#FF6B00", fontWeight:"bold",
            }}>{ch}</button>
          ))}
          <div style={{ position:"absolute", bottom:"10px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"5px" }}>
            {images.map((_, i) => (
              <div key={i} onClick={e=>{ e.stopPropagation(); setIdx(i); }} style={{
                width: i===idx ? "20px" : "6px", height:"6px",
                borderRadius:"3px", background: i===idx ? "#FF6B00" : "rgba(255,255,255,0.65)",
                transition:"all 0.2s", cursor:"pointer",
              }} />
            ))}
          </div>
        </>
      )}
      <div style={{ position:"absolute", top:"10px", right:"10px", background:"rgba(0,0,0,0.45)", borderRadius:"20px", padding:"3px 9px", color:"#fff", fontSize:"11px", fontWeight:"700" }}>
        {idx+1} / {images.length}
      </div>
    </div>
  );
}

function PostCard({ post, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onOpen(post)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:"#fff", borderRadius:"22px", overflow:"hidden",
        border:"1.5px solid #FFE4CC",
        boxShadow: hov ? "0 12px 36px rgba(255,107,0,0.18)" : "0 3px 16px rgba(255,107,0,0.07)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition:"all 0.18s", cursor:"pointer",
      }}
    >
      <Carousel images={post.images} />
      <div style={{ padding:"16px 18px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
          <div style={{ display:"flex", gap:"7px", alignItems:"center" }}>
            <span style={{
              background: post.species==="강아지" ? "#FFF3E0" : "#F3E5FF",
              color: post.species==="강아지" ? "#E65100" : "#7B1FA2",
              borderRadius:"20px", padding:"3px 11px", fontSize:"12px", fontWeight:"700",
            }}>{post.species==="강아지" ? "🐕 강아지" : "🐈 고양이"}</span>
            <span style={{ fontSize:"13px", color:"#aaa" }}>{post.breed}</span>
          </div>
          <div style={{ display:"flex", gap:"5px" }}>
            {post.urgent && <span style={{ background:"#FFF0F0", color:"#E53935", borderRadius:"20px", padding:"2px 9px", fontSize:"11px", fontWeight:"700" }}>🚨 긴급</span>}
            {post.status==="해결됨" && <span style={{ background:"#E8F5E9", color:"#2E7D32", borderRadius:"20px", padding:"2px 9px", fontSize:"11px", fontWeight:"700" }}>✅ 해결됨</span>}
          </div>
        </div>
        <p style={{ margin:"0 0 12px", fontSize:"14px", color:"#444", lineHeight:"1.6",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {post.desc}
        </p>
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
          <span style={{ fontSize:"12px", color:"#aaa" }}>📍 {post.location}</span>
          <span style={{ fontSize:"12px", color:"#aaa" }}>🕐 {post.time}</span>
          {post.reward && <span style={{ fontSize:"12px", color:"#FF6B00", fontWeight:"700" }}>💰 {post.reward}</span>}
          {post.period && <span style={{ fontSize:"12px", color:"#2E7D32", fontWeight:"700" }}>📅 {post.period}</span>}
        </div>
      </div>
    </div>
  );
}

function DetailModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.55)",
      display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:2000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff", borderRadius:"28px 28px 0 0",
        width:"100%", maxWidth:"600px", maxHeight:"90vh", overflowY:"auto",
        animation:"slideUp 0.3s ease",
      }}>
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 0" }}>
          <div style={{ width:"40px", height:"4px", background:"#FFD5B0", borderRadius:"2px" }} />
        </div>
        <div style={{ padding:"14px 20px 36px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"14px" }}>
            <div>
              <div style={{ fontSize:"20px", fontWeight:"800", color:"#1a1a1a" }}>
                {post.species==="강아지" ? "🐕" : "🐈"} {post.breed}
              </div>
              <div style={{ fontSize:"13px", color:"#bbb", marginTop:"2px" }}>📍 {post.location} · 🕐 {post.time}</div>
            </div>
            <button onClick={onClose} style={{ background:"#f5f5f5", border:"none", borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer", fontSize:"18px", color:"#888" }}>×</button>
          </div>
          {post.images?.length > 0 && <div style={{ marginBottom:"18px", borderRadius:"18px", overflow:"hidden" }}><Carousel images={post.images} height={240} /></div>}
          <div style={{ background:"#FFF8F4", borderRadius:"14px", padding:"16px", marginBottom:"16px", border:"1px solid #FFE0CC" }}>
            <p style={{ margin:0, fontSize:"15px", lineHeight:"1.75", color:"#333" }}>{post.desc}</p>
          </div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"18px" }}>
            {post.urgent && <span style={{ background:"#FFF0F0", color:"#E53935", borderRadius:"20px", padding:"5px 14px", fontSize:"13px", fontWeight:"700" }}>🚨 긴급</span>}
            {post.reward && <span style={{ background:"#FFF8E1", color:"#E65100", borderRadius:"20px", padding:"5px 14px", fontSize:"13px", fontWeight:"700" }}>💰 {post.reward}</span>}
            {post.period && <span style={{ background:"#E8F5E9", color:"#2E7D32", borderRadius:"20px", padding:"5px 14px", fontSize:"13px", fontWeight:"700" }}>📅 {post.period}</span>}
          </div>
          <div style={{ background:"linear-gradient(135deg, #FF6B00, #FF9A3C)", borderRadius:"16px", padding:"16px", textAlign:"center", color:"#fff" }}>
            <div style={{ fontSize:"11px", opacity:0.85, marginBottom:"4px" }}>연락처</div>
            <div style={{ fontSize:"22px", fontWeight:"800" }}>📞 {post.contact}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WriteModal({ tab, onClose, onSubmit }) {
  const [form, setForm] = useState({ species:"강아지", breed:"", location:"", desc:"", contact:"", reward:"", period:"", urgent:false });
  const [imgs, setImgs] = useState([]);
  const fileRef = useRef();

  const handleFile = (e) => {
    Array.from(e.target.files).forEach(f => {
      const r = new FileReader();
      r.onload = ev => setImgs(p => [...p, ev.target.result]);
      r.readAsDataURL(f);
    });
  };

  const input = {
    width:"100%", background:"#FFF8F4", border:"1.5px solid #FFD5B0",
    borderRadius:"12px", padding:"12px 14px", color:"#333", fontSize:"14px",
    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
  };
  const lbl = { fontSize:"13px", fontWeight:"700", color:"#FF6B00", marginBottom:"6px", display:"block" };
  const curTab = TABS.find(t => t.id === tab);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:2000 }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff", borderRadius:"28px 28px 0 0",
        width:"100%", maxWidth:"600px", maxHeight:"93vh", overflowY:"auto",
        animation:"slideUp 0.3s ease",
      }}>
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 0" }}>
          <div style={{ width:"40px", height:"4px", background:"#FFD5B0", borderRadius:"2px" }} />
        </div>
        <div style={{ padding:"16px 22px 40px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"22px" }}>
            <div>
              <div style={{ fontSize:"11px", color:"#FF6B00", fontWeight:"700", letterSpacing:"1px", marginBottom:"3px" }}>{curTab?.icon} {curTab?.label}</div>
              <div style={{ fontSize:"20px", fontWeight:"800" }}>새 글 작성하기</div>
            </div>
            <button onClick={onClose} style={{ background:"#f5f5f5", border:"none", borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer", fontSize:"18px" }}>×</button>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div>
              <label style={lbl}>종류 *</label>
              <div style={{ display:"flex", gap:"10px" }}>
                {["강아지","고양이"].map(s => (
                  <button key={s} onClick={() => setForm(f=>({...f,species:s}))} style={{
                    flex:1, padding:"11px", borderRadius:"12px", cursor:"pointer",
                    border: form.species===s ? "2px solid #FF6B00" : "1.5px solid #FFD5B0",
                    background: form.species===s ? "#FFF3EB" : "#FFF8F4",
                    color: form.species===s ? "#FF6B00" : "#bbb",
                    fontWeight: form.species===s ? "800" : "500", fontSize:"14px",
                    transition:"all 0.15s", fontFamily:"inherit",
                  }}>{s==="강아지" ? "🐕 강아지" : "🐈 고양이"}</button>
                ))}
              </div>
            </div>

            {/* 사진 첨부 */}
            <div>
              <label style={lbl}>📷 사진 첨부</label>
              <div onClick={() => fileRef.current.click()} style={{
                border:"2px dashed #FFD5B0", borderRadius:"14px", padding:"20px",
                textAlign:"center", cursor:"pointer", background:"#FFF8F4",
              }}>
                <div style={{ fontSize:"28px", marginBottom:"6px" }}>🖼️</div>
                <div style={{ color:"#FF6B00", fontWeight:"700", fontSize:"14px" }}>사진 선택하기</div>
                <div style={{ color:"#ccc", fontSize:"12px", marginTop:"3px" }}>여러 장 선택 가능 · 선택 후 캐러셀로 보여요</div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handleFile} />
              {imgs.length > 0 && (
                <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginTop:"10px" }}>
                  {imgs.map((src, i) => (
                    <div key={i} style={{ position:"relative", width:"80px", height:"80px" }}>
                      <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"10px" }} />
                      <button onClick={() => setImgs(p => p.filter((_,j)=>j!==i))} style={{
                        position:"absolute", top:"-7px", right:"-7px", background:"#FF6B00",
                        border:"none", borderRadius:"50%", width:"20px", height:"20px",
                        color:"#fff", cursor:"pointer", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center",
                      }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div><label style={lbl}>품종 *</label><input style={input} placeholder="예: 믹스견, 코리안숏헤어" value={form.breed} onChange={e=>setForm(f=>({...f,breed:e.target.value}))} /></div>
            <div><label style={lbl}>위치 *</label><input style={input} placeholder="예: 수원시 영통구 매탄동" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
            <div><label style={lbl}>내용 *</label><textarea style={{...input, height:"100px", resize:"vertical"}} placeholder="상황을 자세히 적어주세요..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} /></div>
            <div><label style={lbl}>연락처 *</label><input style={input} placeholder="010-0000-0000" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} /></div>
            {tab==="find" && <div><label style={lbl}>사례금</label><input style={input} placeholder="예: 사례금 30만원" value={form.reward} onChange={e=>setForm(f=>({...f,reward:e.target.value}))} /></div>}
            {tab==="foster" && <div><label style={lbl}>보호 기간</label><input style={input} placeholder="예: 2개월, 입양까지" value={form.period} onChange={e=>setForm(f=>({...f,period:e.target.value}))} /></div>}

            {/* urgent toggle */}
            <div onClick={()=>setForm(f=>({...f,urgent:!f.urgent}))} style={{
              display:"flex", alignItems:"center", gap:"12px",
              background: form.urgent ? "#FFF0F0" : "#f9f9f9",
              border:`1.5px solid ${form.urgent ? "#FFCDD2" : "#eee"}`,
              borderRadius:"12px", padding:"13px 16px", cursor:"pointer",
            }}>
              <div style={{ width:"44px", height:"26px", borderRadius:"13px", background: form.urgent ? "#FF6B00" : "#ddd", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"#fff", position:"absolute", top:"3px", left: form.urgent ? "21px" : "3px", transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
              <div>
                <div style={{ fontWeight:"700", fontSize:"14px", color: form.urgent ? "#E53935" : "#888" }}>🚨 긴급 상황 표시</div>
                <div style={{ fontSize:"12px", color:"#bbb" }}>빠른 도움이 필요할 때</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!form.breed || !form.location || !form.desc || !form.contact) { alert("필수 항목을 입력해주세요!"); return; }
                onSubmit({ ...form, images: imgs });
              }}
              style={{
                background:"linear-gradient(135deg, #FF6B00, #FF9A3C)",
                border:"none", borderRadius:"16px", padding:"16px",
                color:"#fff", fontWeight:"800", fontSize:"16px", cursor:"pointer",
                boxShadow:"0 6px 20px rgba(255,107,0,0.35)", fontFamily:"inherit",
              }}
            >🐾 게시하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PoPoApp() {
  const [activeTab, setActiveTab] = useState("sighting");
  const [data, setData] = useState(SAMPLE_DATA);
  const [selected, setSelected] = useState(null);
  const [showWrite, setShowWrite] = useState(false);
  const [filterSpecies, setFilterSpecies] = useState("전체");
  const [filterUrgent, setFilterUrgent] = useState(false);

  const posts = data[activeTab] || [];
  const filtered = posts.filter(p => {
    if (filterSpecies !== "전체" && p.species !== filterSpecies) return false;
    if (filterUrgent && !p.urgent) return false;
    return true;
  });

  const allPosts = Object.values(data).flat();
  const urgentCount = allPosts.filter(p => p.urgent && p.status !== "해결됨").length;
  const resolvedCount = allPosts.filter(p => p.status === "해결됨").length;

  const handleSubmit = (form) => {
    const fallback = form.species === "강아지" ? [DOG_IMGS[0]] : [CAT_IMGS[0]];
    setData(d => ({
      ...d,
      [activeTab]: [{
        id: Date.now(), species: form.species, breed: form.breed,
        location: form.location, time: "방금 전", desc: form.desc,
        contact: form.contact, reward: form.reward, period: form.period,
        urgent: form.urgent, status: "미해결",
        images: form.images?.length ? form.images : fallback,
      }, ...d[activeTab]],
    }));
    setShowWrite(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#FFF8F4", fontFamily:"'Apple SD Gothic Neo','Noto Sans KR',sans-serif", color:"#1a1a1a" }}>
      <style>{`
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#FFD5B0; border-radius:2px; }
        @keyframes slideUp { from { transform:translateY(80px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }

        .popo-header { padding: 44px 20px 28px; }
        .popo-logo-emoji { font-size: 40px; }
        .popo-logo-title { font-size: 40px; letter-spacing: -2px; }
        .popo-logo-sub { font-size: 13px; letter-spacing: 2px; }
        .popo-stat-box { padding: 10px 16px; border-radius: 14px; }
        .popo-stat-value { font-size: 20px; }
        .popo-stat-label { font-size: 11px; }
        .popo-paw-deco { display: block; }

        @media (max-width: 480px) {
          .popo-header { padding: 16px 16px 14px !important; }
          .popo-logo-emoji { font-size: 26px !important; }
          .popo-logo-title { font-size: 26px !important; letter-spacing: -1px !important; }
          .popo-logo-sub { font-size: 11px !important; letter-spacing: 1px !important; }
          .popo-logo-row { gap: 8px !important; margin-bottom: 10px !important; }
          .popo-stat-box { padding: 7px 11px !important; border-radius: 10px !important; }
          .popo-stat-value { font-size: 15px !important; }
          .popo-stat-label { font-size: 10px !important; }
          .popo-stats-row { gap: 7px !important; margin-top: 0 !important; }
          .popo-paw-deco { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <header className="popo-header" style={{
        background:"linear-gradient(135deg, #FF5500 0%, #FF7A1A 50%, #FFB347 100%)",
        position:"relative", overflow:"hidden",
      }}>
        {[...Array(8)].map((_,i) => (
          <div key={i} className="popo-paw-deco" style={{
            position:"absolute", top:`${5+i*12}%`, right:`${3+i*6}%`,
            fontSize:`${14+i*3}px`, opacity:0.1, transform:`rotate(${i*25}deg)`,
            pointerEvents:"none",
          }}>🐾</div>
        ))}
        <div style={{ maxWidth:"640px", margin:"0 auto", position:"relative" }}>
          <div className="popo-logo-row" style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"6px" }}>
            <span className="popo-logo-emoji" style={{ filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}>🐾</span>
            <div>
              <h1 className="popo-logo-title" style={{ margin:0, fontWeight:"900", color:"#fff", lineHeight:1, textShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>포포</h1>
              <span className="popo-logo-sub" style={{ color:"rgba(255,255,255,0.8)", fontWeight:"500" }}>PoPo · 유기동물 커뮤니티</span>
            </div>
          </div>
          <div className="popo-stats-row" style={{ display:"flex", gap:"10px", marginTop:"18px" }}>
            {[
              { label:"전체 게시글", value:allPosts.length },
              { label:"긴급 상황",   value:urgentCount },
              { label:"해결됨",      value:resolvedCount },
            ].map(s => (
              <div key={s.label} className="popo-stat-box" style={{
                background:"rgba(255,255,255,0.2)",
                backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.3)",
              }}>
                <div className="popo-stat-value" style={{ fontWeight:"900", color:"#fff" }}>{s.value}</div>
                <div className="popo-stat-label" style={{ color:"rgba(255,255,255,0.75)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* TABS */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #FFE4CC", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:"640px", margin:"0 auto", display:"flex" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex:1, padding:"14px 8px", border:"none", cursor:"pointer",
              background:"transparent", fontFamily:"inherit",
              color: activeTab===tab.id ? "#FF6B00" : "#bbb",
              fontWeight: activeTab===tab.id ? "800" : "500", fontSize:"14px",
              borderBottom: activeTab===tab.id ? "3px solid #FF6B00" : "3px solid transparent",
              transition:"all 0.18s",
            }}>
              {tab.icon} {tab.label}
              <span style={{
                marginLeft:"5px",
                background: activeTab===tab.id ? "#FFF3EB" : "#f5f5f5",
                color: activeTab===tab.id ? "#FF6B00" : "#ccc",
                borderRadius:"20px", padding:"1px 7px", fontSize:"11px", fontWeight:"700",
              }}>{data[tab.id]?.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth:"640px", margin:"0 auto", padding:"14px 16px 2px" }}>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          {["전체","강아지","고양이"].map(s => (
            <button key={s} onClick={() => setFilterSpecies(s)} style={{
              padding:"7px 16px", borderRadius:"20px", border:"none", cursor:"pointer",
              background: filterSpecies===s ? "#FF6B00" : "#fff",
              color: filterSpecies===s ? "#fff" : "#aaa",
              fontSize:"13px", fontWeight: filterSpecies===s ? "700" : "400",
              border: filterSpecies===s ? "none" : "1.5px solid #FFD5B0",
              boxShadow: filterSpecies===s ? "0 3px 10px rgba(255,107,0,0.3)" : "none",
              fontFamily:"inherit",
            }}>{s==="강아지" ? "🐕 " : s==="고양이" ? "🐈 " : ""}{s}</button>
          ))}
          <button onClick={() => setFilterUrgent(!filterUrgent)} style={{
            padding:"7px 16px", borderRadius:"20px", cursor:"pointer", fontSize:"13px",
            background: filterUrgent ? "#E53935" : "#fff",
            color: filterUrgent ? "#fff" : "#E53935",
            fontWeight: filterUrgent ? "700" : "500",
            border:`1.5px solid ${filterUrgent ? "#E53935" : "#FFCDD2"}`,
            boxShadow: filterUrgent ? "0 3px 10px rgba(229,57,53,0.22)" : "none",
            fontFamily:"inherit",
          }}>🚨 긴급만</button>
        </div>
      </div>

      {/* CARDS */}
      <main style={{ maxWidth:"640px", margin:"0 auto", padding:"14px 16px 120px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#ddd" }}>
            <div style={{ fontSize:"54px", marginBottom:"14px" }}>🐾</div>
            <div style={{ fontSize:"16px", fontWeight:"600", color:"#ccc" }}>게시글이 없어요</div>
            <div style={{ fontSize:"13px", color:"#ddd", marginTop:"6px" }}>첫 번째 제보를 남겨보세요!</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {filtered.map((post, i) => (
              <div key={post.id} style={{ animation:`fadeIn 0.3s ease ${i*0.06}s both` }}>
                <PostCard post={post} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button onClick={() => setShowWrite(true)} style={{
        position:"fixed", bottom:"28px", left:"50%", transform:"translateX(-50%)",
        background:"linear-gradient(135deg, #FF5500, #FF9A3C)",
        border:"none", borderRadius:"30px", padding:"15px 32px",
        color:"#fff", fontWeight:"800", fontSize:"16px", cursor:"pointer",
        boxShadow:"0 8px 28px rgba(255,85,0,0.45)",
        display:"flex", alignItems:"center", gap:"8px",
        zIndex:100, fontFamily:"inherit", whiteSpace:"nowrap",
      }}>
        <span style={{ fontSize:"20px" }}>🐾</span> 글 작성하기
      </button>

      {selected   && <DetailModal post={selected} onClose={() => setSelected(null)} />}
      {showWrite  && <WriteModal  tab={activeTab}  onClose={() => setShowWrite(false)} onSubmit={handleSubmit} />}
    </div>
  );
}