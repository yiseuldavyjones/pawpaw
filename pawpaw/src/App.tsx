import { useState, useRef } from "react";

// ─── 이미지 데이터 ────────────────────────────────────────────────────────────
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

// ─── 샘플 데이터 ──────────────────────────────────────────────────────────────
const SAMPLE_DATA = {
  sighting: [
    { id:1, species:"강아지", breed:"믹스견",       location:"수원시 영통구 매탄동", time:"2시간 전",  contact:"010-1234-5678", urgent:true,  status:"미해결", images:[DOG_IMGS[0], DOG_IMGS[1]], desc:"갈색 소형견, 목줄 없음. 편의점 앞에서 배회 중입니다. 간식 줬더니 먹었어요." },
    { id:2, species:"고양이", breed:"코숏",         location:"수원시 팔달구 화서동", time:"5시간 전",  contact:"010-9876-5432", urgent:false, status:"미해결", images:[CAT_IMGS[0]],               desc:"흰색 고양이, 오른쪽 귀에 상처. 주차장에서 울고 있었어요." },
    { id:3, species:"강아지", breed:"포메라니안",   location:"수원시 권선구 권선동", time:"어제",      contact:"010-5555-1111", urgent:false, status:"해결됨", images:[DOG_IMGS[2], DOG_IMGS[3]], desc:"아이보리색 포메, 리본 달린 목걸이. 공원 근처에서 봤습니다." },
  ],
  find: [
    { id:4, species:"강아지", breed:"골든리트리버", location:"수원시 장안구",         time:"3일 전",   contact:"010-2222-3333", urgent:true,  status:"미해결", images:[DOG_IMGS[1], DOG_IMGS[3]], desc:"이름: 망고. 2살 수컷. 노란 하네스 착용. 2월 20일 오후 2시 실종. 제발 연락주세요 🙏", reward:"사례금 있음" },
    { id:5, species:"고양이", breed:"러시안블루",   location:"수원시 영통구",         time:"1주일 전", contact:"010-7777-8888", urgent:true,  status:"미해결", images:[CAT_IMGS[1], CAT_IMGS[2]], desc:"이름: 두부. 3살 암컷. 중성화 O. 회색 털, 초록 눈. 실내묘라 매우 위험합니다.",        reward:"없음" },
  ],
  foster: [
    { id:6, species:"강아지", breed:"치와와 추정",  location:"수원시 팔달구",         time:"오늘",     contact:"010-3333-4444", urgent:false, status:"모집중", images:[DOG_IMGS[0], DOG_IMGS[2]], desc:"2개월 예정. 건강검진 완료. 밥·모래·패드 제공. 입양 의사 있으신 분도 환영!",           period:"2개월" },
    { id:7, species:"고양이", breed:"터키시앙고라", location:"서울시 강남구",         time:"2일 전",   contact:"010-6666-9999", urgent:true,  status:"모집중", images:[CAT_IMGS[3], CAT_IMGS[0], CAT_IMGS[2]], desc:"구조된 새끼 고양이 3마리. 약 5주령. 포뮬러 수유 필요. 경험자 우대.",          period:"입양까지" },
  ],
};

const TABS = [
  { id:"sighting", label:"목격 제보", icon:"👀" },
  { id:"find",     label:"찾아요",   icon:"🔍" },
  { id:"foster",   label:"임시보호", icon:"🏠" },
];

// ─── 전역 CSS ─────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FFF8F4; font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; }
  button { font-family: inherit; cursor: pointer; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #FFD5B0; border-radius: 2px; }

  @keyframes slideUp { from { transform: translateY(80px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeIn  { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1;  } }

  /* ── 레이아웃 ── */
  .page          { min-height: 100vh; background: #FFF8F4; color: #1a1a1a; }
  .inner         { max-width: 640px; margin: 0 auto; }

  /* ── 헤더 ── */
  .header        { background: linear-gradient(135deg, #FF5500, #FF7A1A 50%, #FFB347); padding: 44px 20px 28px; position: relative; overflow: hidden; }
  .header__deco  { position: absolute; opacity: 0.1; pointer-events: none; }
  .header__logo  { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
  .header__emoji { font-size: 40px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15)); }
  .header__title { font-size: 40px; font-weight: 900; color: #fff; letter-spacing: -2px; line-height: 1; text-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .header__sub   { font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 500; letter-spacing: 2px; }
  .header__stats { display: flex; gap: 10px; margin-top: 18px; }
  .stat-box      { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 14px; padding: 10px 16px; backdrop-filter: blur(8px); }
  .stat-box__val { font-size: 20px; font-weight: 900; color: #fff; }
  .stat-box__lbl { font-size: 11px; color: rgba(255,255,255,0.75); }

  /* ── 탭 ── */
  .tab-bar       { background: #fff; border-bottom: 1.5px solid #FFE4CC; position: sticky; top: 0; z-index: 100; }
  .tab-bar__list { display: flex; }
  .tab-btn       { flex: 1; padding: 14px 8px; border: none; border-bottom: 3px solid transparent; background: transparent; color: #bbb; font-size: 14px; font-weight: 500; transition: all 0.18s; }
  .tab-btn.active { color: #FF6B00; font-weight: 800; border-bottom-color: #FF6B00; }
  .tab-btn__badge { margin-left: 5px; border-radius: 20px; padding: 1px 7px; font-size: 11px; font-weight: 700; background: #f5f5f5; color: #ccc; }
  .tab-btn.active .tab-btn__badge { background: #FFF3EB; color: #FF6B00; }

  /* ── 필터 ── */
  .filters       { padding: 14px 16px 2px; }
  .filters__list { display: flex; gap: 8px; flex-wrap: wrap; }
  .filter-btn    { padding: 7px 16px; border-radius: 20px; border: 1.5px solid #FFD5B0; background: #fff; color: #aaa; font-size: 13px; transition: all 0.15s; }
  .filter-btn.active   { background: #FF6B00; border-color: #FF6B00; color: #fff; font-weight: 700; box-shadow: 0 3px 10px rgba(255,107,0,0.3); }
  .filter-btn--urgent  { border-color: #FFCDD2; color: #E53935; }
  .filter-btn--urgent.active { background: #E53935; border-color: #E53935; color: #fff; box-shadow: 0 3px 10px rgba(229,57,53,0.22); }

  /* ── 카드 목록 ── */
  .card-list     { padding: 14px 16px 120px; display: flex; flex-direction: column; gap: 16px; }
  .card-list__empty { text-align: center; padding: 80px 0; }
  .card-list__empty-icon  { font-size: 54px; margin-bottom: 14px; }
  .card-list__empty-title { font-size: 16px; font-weight: 600; color: #ccc; }
  .card-list__empty-sub   { font-size: 13px; color: #ddd; margin-top: 6px; }
  .card-wrap     { animation: fadeIn 0.3s ease both; }

  /* ── 포스트 카드 ── */
  .card          { background: #fff; border-radius: 22px; overflow: hidden; border: 1.5px solid #FFE4CC; box-shadow: 0 3px 16px rgba(255,107,0,0.07); transition: all 0.18s; cursor: pointer; }
  .card:hover    { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(255,107,0,0.18); }
  .card__body    { padding: 16px 18px 18px; }
  .card__toprow  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .card__tags    { display: flex; gap: 7px; align-items: center; }
  .card__badges  { display: flex; gap: 5px; }
  .card__desc    { font-size: 14px; color: #444; line-height: 1.6; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .card__meta    { display: flex; gap: 12px; flex-wrap: wrap; }
  .card__meta-item      { font-size: 12px; color: #aaa; }
  .card__meta-item--reward { color: #FF6B00; font-weight: 700; }
  .card__meta-item--period { color: #2E7D32; font-weight: 700; }

  /* ── 태그/뱃지 공통 ── */
  .tag           { border-radius: 20px; padding: 3px 11px; font-size: 12px; font-weight: 700; }
  .tag--dog      { background: #FFF3E0; color: #E65100; }
  .tag--cat      { background: #F3E5FF; color: #7B1FA2; }
  .badge         { border-radius: 20px; padding: 2px 9px; font-size: 11px; font-weight: 700; }
  .badge--urgent  { background: #FFF0F0; color: #E53935; }
  .badge--solved  { background: #E8F5E9; color: #2E7D32; }
  .breed-text    { font-size: 13px; color: #aaa; }

  /* ── 캐러셀 ── */
  .carousel           { position: relative; width: 100%; background: #f5ede6; overflow: hidden; }
  .carousel__img      { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 0.25s; }
  .carousel__overlay  { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.32) 100%); }
  .carousel__btn      { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.88); border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: #FF6B00; box-shadow: 0 2px 8px rgba(0,0,0,0.18); }
  .carousel__btn--prev { left: 10px; }
  .carousel__btn--next { right: 10px; }
  .carousel__dots     { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px; }
  .carousel__dot      { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.65); transition: all 0.2s; cursor: pointer; }
  .carousel__dot.active { width: 20px !important; background: #FF6B00; }
  .carousel__counter  { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.45); border-radius: 20px; padding: 3px 9px; color: #fff; font-size: 11px; font-weight: 700; }

  /* ── 모달 공통 ── */
  .modal-overlay  { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: flex-end; justify-content: center; z-index: 2000; }
  .modal-sheet    { background: #fff; border-radius: 28px 28px 0 0; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s ease; }
  .modal-handle   { display: flex; justify-content: center; padding: 12px 0 0; }
  .modal-handle__bar { width: 40px; height: 4px; background: #FFD5B0; border-radius: 2px; }
  .modal-body     { padding: 14px 20px 36px; }
  .modal-header   { display: flex; justify-content: space-between; margin-bottom: 14px; }
  .modal-title    { font-size: 20px; font-weight: 800; color: #1a1a1a; }
  .modal-subtitle { font-size: 13px; color: #bbb; margin-top: 2px; }
  .modal-close    { background: #f5f5f5; border: none; border-radius: 50%; width: 36px; height: 36px; font-size: 18px; color: #888; flex-shrink: 0; }
  .modal-desc     { background: #FFF8F4; border: 1px solid #FFE0CC; border-radius: 14px; padding: 16px; margin-bottom: 16px; font-size: 15px; line-height: 1.75; color: #333; }
  .modal-badges   { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
  .modal-badge    { border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 700; }
  .modal-badge--urgent { background: #FFF0F0; color: #E53935; }
  .modal-badge--reward { background: #FFF8E1; color: #E65100; }
  .modal-badge--period { background: #E8F5E9;  color: #2E7D32; }
  .modal-contact  { background: linear-gradient(135deg, #FF6B00, #FF9A3C); border-radius: 16px; padding: 16px; text-align: center; color: #fff; }
  .modal-contact__label { font-size: 11px; opacity: 0.85; margin-bottom: 4px; }
  .modal-contact__num   { font-size: 22px; font-weight: 800; }

  /* ── 글쓰기 모달 ── */
  .write-body     { padding: 16px 22px 40px; }
  .write-header   { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
  .write-category { font-size: 11px; color: #FF6B00; font-weight: 700; letter-spacing: 1px; margin-bottom: 3px; }
  .write-title    { font-size: 20px; font-weight: 800; }
  .write-form     { display: flex; flex-direction: column; gap: 16px; }
  .write-label    { display: block; font-size: 13px; font-weight: 700; color: #FF6B00; margin-bottom: 6px; }
  .write-input    { width: 100%; background: #FFF8F4; border: 1.5px solid #FFD5B0; border-radius: 12px; padding: 12px 14px; color: #333; font-size: 14px; outline: none; resize: vertical; }
  .write-input:focus { border-color: #FF6B00; }
  .write-species  { display: flex; gap: 10px; }
  .species-btn    { flex: 1; padding: 11px; border-radius: 12px; border: 1.5px solid #FFD5B0; background: #FFF8F4; color: #bbb; font-size: 14px; font-weight: 500; transition: all 0.15s; }
  .species-btn.active { border: 2px solid #FF6B00; background: #FFF3EB; color: #FF6B00; font-weight: 800; }
  .upload-zone    { border: 2px dashed #FFD5B0; border-radius: 14px; padding: 20px; text-align: center; cursor: pointer; background: #FFF8F4; transition: background 0.15s; }
  .upload-zone:hover  { background: #FFEDE0; }
  .upload-zone__icon  { font-size: 28px; margin-bottom: 6px; }
  .upload-zone__label { color: #FF6B00; font-weight: 700; font-size: 14px; }
  .upload-zone__hint  { color: #ccc; font-size: 12px; margin-top: 3px; }
  .img-preview-list   { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
  .img-preview-item   { position: relative; width: 80px; height: 80px; }
  .img-preview-item img { width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }
  .img-preview-item__remove { position: absolute; top: -7px; right: -7px; background: #FF6B00; border: none; border-radius: 50%; width: 20px; height: 20px; color: #fff; font-size: 12px; display: flex; align-items: center; justify-content: center; }
  .toggle-row     { display: flex; align-items: center; gap: 12px; border-radius: 12px; padding: 13px 16px; cursor: pointer; transition: all 0.15s; }
  .toggle-row--off { background: #f9f9f9; border: 1.5px solid #eee; }
  .toggle-row--on  { background: #FFF0F0; border: 1.5px solid #FFCDD2; }
  .toggle-track    { width: 44px; height: 26px; border-radius: 13px; position: relative; transition: background 0.2s; flex-shrink: 0; }
  .toggle-thumb    { width: 20px; height: 20px; border-radius: 50%; background: #fff; position: absolute; top: 3px; transition: left 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
  .toggle-label    { font-size: 14px; font-weight: 700; }
  .toggle-hint     { font-size: 12px; color: #bbb; }
  .submit-btn      { background: linear-gradient(135deg, #FF6B00, #FF9A3C); border: none; border-radius: 16px; padding: 16px; color: #fff; font-weight: 800; font-size: 16px; box-shadow: 0 6px 20px rgba(255,107,0,0.35); transition: transform 0.15s, box-shadow 0.15s; margin-top: 4px; }
  .submit-btn:hover { transform: scale(1.02); box-shadow: 0 8px 28px rgba(255,107,0,0.45); }

  /* ── FAB ── */
  .fab { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #FF5500, #FF9A3C); border: none; border-radius: 30px; padding: 15px 32px; color: #fff; font-weight: 800; font-size: 16px; display: flex; align-items: center; gap: 8px; z-index: 100; white-space: nowrap; box-shadow: 0 8px 28px rgba(255,85,0,0.45); transition: transform 0.15s, box-shadow 0.15s; }
  .fab:hover { transform: translateX(-50%) scale(1.05); box-shadow: 0 12px 36px rgba(255,85,0,0.55); }
  .fab__icon { font-size: 20px; }

  /* ── 모바일 반응형 ── */
  @media (max-width: 480px) {
    .header            { padding: 16px 16px 14px; }
    .header__logo      { gap: 8px; margin-bottom: 4px; }
    .header__emoji     { font-size: 26px; }
    .header__title     { font-size: 26px; letter-spacing: -1px; }
    .header__sub       { font-size: 11px; letter-spacing: 1px; }
    .header__stats     { gap: 7px; margin-top: 10px; }
    .header__deco      { display: none; }
    .stat-box          { padding: 7px 11px; border-radius: 10px; }
    .stat-box__val     { font-size: 15px; }
    .stat-box__lbl     { font-size: 10px; }
  }
`;

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel({ images, height = 200 }) {
  const [idx, setIdx] = useState(0);
  if (!images?.length) return null;

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  return (
    <div className="carousel" style={{ height }}>
      <img className="carousel__img" src={images[idx]} alt="동물 사진" />
      <div className="carousel__overlay" />

      {images.length > 1 && <>
        <button className="carousel__btn carousel__btn--prev" onClick={prev}>‹</button>
        <button className="carousel__btn carousel__btn--next" onClick={next}>›</button>
        <div className="carousel__dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`carousel__dot${i === idx ? " active" : ""}`}
              style={{ width: i === idx ? undefined : "6px" }}
              onClick={e => { e.stopPropagation(); setIdx(i); }}
            />
          ))}
        </div>
      </>}

      <div className="carousel__counter">{idx + 1} / {images.length}</div>
    </div>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────
function PostCard({ post, onOpen }) {
  const isDog = post.species === "강아지";
  return (
    <div className="card" onClick={() => onOpen(post)}>
      <Carousel images={post.images} />
      <div className="card__body">
        <div className="card__toprow">
          <div className="card__tags">
            <span className={`tag ${isDog ? "tag--dog" : "tag--cat"}`}>
              {isDog ? "🐕 강아지" : "🐈 고양이"}
            </span>
            <span className="breed-text">{post.breed}</span>
          </div>
          <div className="card__badges">
            {post.urgent      && <span className="badge badge--urgent">🚨 긴급</span>}
            {post.status === "해결됨" && <span className="badge badge--solved">✅ 해결됨</span>}
          </div>
        </div>
        <p className="card__desc">{post.desc}</p>
        <div className="card__meta">
          <span className="card__meta-item">📍 {post.location}</span>
          <span className="card__meta-item">🕐 {post.time}</span>
          {post.reward && <span className="card__meta-item card__meta-item--reward">💰 {post.reward}</span>}
          {post.period && <span className="card__meta-item card__meta-item--period">📅 {post.period}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── DetailModal ──────────────────────────────────────────────────────────────
function DetailModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle"><div className="modal-handle__bar" /></div>
        <div className="modal-body">
          <div className="modal-header">
            <div>
              <div className="modal-title">{post.species === "강아지" ? "🐕" : "🐈"} {post.breed}</div>
              <div className="modal-subtitle">📍 {post.location} · 🕐 {post.time}</div>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          {post.images?.length > 0 && (
            <div style={{ marginBottom: 18, borderRadius: 18, overflow: "hidden" }}>
              <Carousel images={post.images} height={240} />
            </div>
          )}

          <p className="modal-desc">{post.desc}</p>

          <div className="modal-badges">
            {post.urgent  && <span className="modal-badge modal-badge--urgent">🚨 긴급</span>}
            {post.reward  && <span className="modal-badge modal-badge--reward">💰 {post.reward}</span>}
            {post.period  && <span className="modal-badge modal-badge--period">📅 {post.period}</span>}
          </div>

          <div className="modal-contact">
            <div className="modal-contact__label">연락처</div>
            <div className="modal-contact__num">📞 {post.contact}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WriteModal ───────────────────────────────────────────────────────────────
function WriteModal({ tab, onClose, onSubmit }) {
  const [form, setForm] = useState({ species:"강아지", breed:"", location:"", desc:"", contact:"", reward:"", period:"", urgent:false });
  const [imgs, setImgs]   = useState([]);
  const fileRef = useRef();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleFile = (e) => {
    Array.from(e.target.files).forEach(f => {
      const r = new FileReader();
      r.onload = ev => setImgs(p => [...p, ev.target.result]);
      r.readAsDataURL(f);
    });
  };

  const handleSubmit = () => {
    if (!form.breed || !form.location || !form.desc || !form.contact) {
      alert("필수 항목을 입력해주세요!"); return;
    }
    onSubmit({ ...form, images: imgs });
  };

  const curTab = TABS.find(t => t.id === tab);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle"><div className="modal-handle__bar" /></div>
        <div className="write-body">
          <div className="write-header">
            <div>
              <div className="write-category">{curTab?.icon} {curTab?.label}</div>
              <div className="write-title">새 글 작성하기</div>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="write-form">
            {/* 종류 */}
            <div>
              <label className="write-label">종류 *</label>
              <div className="write-species">
                {["강아지", "고양이"].map(s => (
                  <button
                    key={s}
                    className={`species-btn${form.species === s ? " active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, species: s }))}
                  >
                    {s === "강아지" ? "🐕 강아지" : "🐈 고양이"}
                  </button>
                ))}
              </div>
            </div>

            {/* 사진 */}
            <div>
              <label className="write-label">📷 사진 첨부</label>
              <div className="upload-zone" onClick={() => fileRef.current.click()}>
                <div className="upload-zone__icon">🖼️</div>
                <div className="upload-zone__label">사진 선택하기</div>
                <div className="upload-zone__hint">여러 장 선택 가능 · 캐러셀로 표시돼요</div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handleFile} />
              {imgs.length > 0 && (
                <div className="img-preview-list">
                  {imgs.map((src, i) => (
                    <div key={i} className="img-preview-item">
                      <img src={src} alt="" />
                      <button className="img-preview-item__remove" onClick={() => setImgs(p => p.filter((_,j) => j !== i))}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 텍스트 필드 */}
            <div><label className="write-label">품종 *</label><input className="write-input" placeholder="예: 믹스견, 코리안숏헤어" value={form.breed}    onChange={set("breed")}    /></div>
            <div><label className="write-label">위치 *</label><input className="write-input" placeholder="예: 수원시 영통구 매탄동"  value={form.location} onChange={set("location")} /></div>
            <div><label className="write-label">내용 *</label><textarea className="write-input" style={{ height:100 }} placeholder="상황을 자세히 적어주세요..." value={form.desc} onChange={set("desc")} /></div>
            <div><label className="write-label">연락처 *</label><input className="write-input" placeholder="010-0000-0000" value={form.contact} onChange={set("contact")} /></div>
            {tab === "find"   && <div><label className="write-label">사례금</label>    <input className="write-input" placeholder="예: 사례금 30만원" value={form.reward} onChange={set("reward")} /></div>}
            {tab === "foster" && <div><label className="write-label">보호 기간</label> <input className="write-input" placeholder="예: 2개월, 입양까지" value={form.period} onChange={set("period")} /></div>}

            {/* 긴급 토글 */}
            <div className={`toggle-row ${form.urgent ? "toggle-row--on" : "toggle-row--off"}`} onClick={() => setForm(f => ({ ...f, urgent: !f.urgent }))}>
              <div className="toggle-track" style={{ background: form.urgent ? "#FF6B00" : "#ddd" }}>
                <div className="toggle-thumb" style={{ left: form.urgent ? 21 : 3 }} />
              </div>
              <div>
                <div className="toggle-label" style={{ color: form.urgent ? "#E53935" : "#888" }}>🚨 긴급 상황 표시</div>
                <div className="toggle-hint">빠른 도움이 필요할 때</div>
              </div>
            </div>

            <button className="submit-btn" onClick={handleSubmit}>🐾 게시하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function PoPoApp() {
  const [activeTab,     setActiveTab]     = useState("sighting");
  const [data,          setData]          = useState(SAMPLE_DATA);
  const [selected,      setSelected]      = useState(null);
  const [showWrite,     setShowWrite]     = useState(false);
  const [filterSpecies, setFilterSpecies] = useState("전체");
  const [filterUrgent,  setFilterUrgent]  = useState(false);

  const allPosts     = Object.values(data).flat();
  const urgentCount  = allPosts.filter(p => p.urgent && p.status !== "해결됨").length;
  const resolvedCount = allPosts.filter(p => p.status === "해결됨").length;

  const filtered = (data[activeTab] || []).filter(p => {
    if (filterSpecies !== "전체" && p.species !== filterSpecies) return false;
    if (filterUrgent && !p.urgent) return false;
    return true;
  });

  const handleSubmit = (form) => {
    const fallback = form.species === "강아지" ? [DOG_IMGS[0]] : [CAT_IMGS[0]];
    setData(d => ({
      ...d,
      [activeTab]: [{
        id: Date.now(), ...form,
        time: "방금 전", status: "미해결",
        images: form.images?.length ? form.images : fallback,
      }, ...d[activeTab]],
    }));
    setShowWrite(false);
  };

  return (
    <div className="page">
      <style>{GLOBAL_CSS}</style>

      {/* 헤더 */}
      <header className="header">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="header__deco" style={{ top:`${5+i*12}%`, right:`${3+i*6}%`, fontSize:`${14+i*3}px`, transform:`rotate(${i*25}deg)` }}>🐾</div>
        ))}
        <div className="inner" style={{ position:"relative" }}>
          <div className="header__logo">
            <span className="header__emoji">🐾</span>
            <div>
              <h1 className="header__title">포포</h1>
              <span className="header__sub">PoPo · 유기동물 커뮤니티</span>
            </div>
          </div>
          <div className="header__stats">
            {[
              { label:"전체 게시글", value: allPosts.length },
              { label:"긴급 상황",   value: urgentCount },
              { label:"해결됨",      value: resolvedCount },
            ].map(s => (
              <div key={s.label} className="stat-box">
                <div className="stat-box__val">{s.value}</div>
                <div className="stat-box__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 탭 */}
      <div className="tab-bar">
        <div className="inner tab-bar__list">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
              <span className="tab-btn__badge">{data[tab.id]?.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="inner filters">
        <div className="filters__list">
          {["전체", "강아지", "고양이"].map(s => (
            <button
              key={s}
              className={`filter-btn${filterSpecies === s ? " active" : ""}`}
              onClick={() => setFilterSpecies(s)}
            >
              {s === "강아지" ? "🐕 " : s === "고양이" ? "🐈 " : ""}{s}
            </button>
          ))}
          <button
            className={`filter-btn filter-btn--urgent${filterUrgent ? " active" : ""}`}
            onClick={() => setFilterUrgent(v => !v)}
          >
            🚨 긴급만
          </button>
        </div>
      </div>

      {/* 카드 목록 */}
      <main className="inner">
        {filtered.length === 0 ? (
          <div className="card-list__empty">
            <div className="card-list__empty-icon">🐾</div>
            <div className="card-list__empty-title">게시글이 없어요</div>
            <div className="card-list__empty-sub">첫 번째 제보를 남겨보세요!</div>
          </div>
        ) : (
          <div className="card-list">
            {filtered.map((post, i) => (
              <div key={post.id} className="card-wrap" style={{ animationDelay:`${i * 0.06}s` }}>
                <PostCard post={post} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button className="fab" onClick={() => setShowWrite(true)}>
        <span className="fab__icon">🐾</span> 글 작성하기
      </button>

      {selected  && <DetailModal post={selected}  onClose={() => setSelected(null)} />}
      {showWrite && <WriteModal  tab={activeTab}  onClose={() => setShowWrite(false)} onSubmit={handleSubmit} />}
    </div>
  );
}