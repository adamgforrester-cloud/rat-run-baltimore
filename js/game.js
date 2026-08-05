
import { ratHitSound, countdownSound, startSound } from "./audio.js";

export class RatRunGame {
  constructor(canvas, hooks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.hooks = hooks;
    this.running = false;
    this.duration = 30;
    this.score = 0;
    this.combo = 0;
    this.comboClock = 0;
    this.elapsed = 0;
    this.rats = [];
    this.particles = [];
    this.floaters = [];
    this.spawnClock = 0;
    this.last = 0;
    this.shake = 0;
    this.lastCountdown = null;
    this.worldScroll = 0;
    this.resize();
    addEventListener("resize", () => this.resize());
    canvas.addEventListener("pointerdown", e => this.pointer(e));
    this.drawStaticPreview();
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.width = innerWidth;
    this.height = innerHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  start() {
    this.running = true;
    this.score = 0;
    this.combo = 0;
    this.comboClock = 0;
    this.elapsed = 0;
    this.rats = [];
    this.particles = [];
    this.floaters = [];
    this.spawnClock = .15;
    this.shake = 0;
    this.lastCountdown = null;
    this.worldScroll = 0;
    this.last = performance.now();
    startSound();
    this.hooks.onScore?.(0,0);
    this.hooks.onTime?.(30);
    requestAnimationFrame(t => this.loop(t));
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.hooks.onFinish?.(Math.floor(this.score));
  }

  loop(now) {
    if (!this.running) return;
    const dt = Math.min(.033, Math.max(.001,(now-this.last)/1000));
    this.last = now;
    try {
      this.update(dt);
      this.draw();
    } catch (error) {
      console.error("Frame recovered:", error);
      this.rats = this.rats.filter(Boolean);
      this.particles = this.particles.filter(Boolean);
      this.floaters = this.floaters.filter(Boolean);
    }
    if (this.running) requestAnimationFrame(t => this.loop(t));
  }

  update(dt) {
    this.elapsed += dt;
    this.worldScroll += dt*(155 + this.elapsed*2.2);
    const remaining = Math.max(0, this.duration-this.elapsed);
    this.hooks.onTime?.(Math.ceil(remaining));
    const n = Math.ceil(remaining);
    if (n <= 10 && n > 0 && n !== this.lastCountdown) {
      this.lastCountdown = n;
      countdownSound(n);
      this.hooks.onCountdown?.(n);
    }
    if (remaining <= 0) return this.stop();

    this.comboClock -= dt;
    if (this.comboClock <= 0 && this.combo) {
      this.combo = 0;
      this.hooks.onScore?.(Math.floor(this.score),this.combo);
    }

    this.spawnClock -= dt;
    const desired = Math.min(9, 3 + Math.floor(this.elapsed/5));
    if (this.spawnClock <= 0 && this.rats.length < desired) {
      this.spawnRat();
      this.spawnClock = Math.max(.26,.62-this.elapsed*.009);
    }

    for (const rat of this.rats) this.updateRat(rat,dt);
    this.rats = this.rats.filter(r => r.life > 0 && r.x > -120 && r.x < this.width+120);

    for (const p of this.particles) {
      p.x += p.vx*dt; p.y += p.vy*dt;
      p.vy += 45*dt; p.life -= dt;
    }
    this.particles = this.particles.filter(p => p.life > 0);

    for (const f of this.floaters) {
      f.y -= 55*dt; f.life -= dt;
    }
    this.floaters = this.floaters.filter(f => f.life > 0);
    this.shake = Math.max(0,this.shake-dt*34);
  }

  spawnRat() {
    const fromLeft = Math.random() < .5;
    const horizon = this.height*.31;
    const roadBottom = this.height*.98;
    const y = horizon + (roadBottom-horizon)*(.35+Math.random()*.58);
    const depth = (y-horizon)/(roadBottom-horizon);
    const radius = 10 + depth*14;
    const speed = 105 + depth*125 + Math.random()*55;
    this.rats.push({
      x: fromLeft ? -radius*3 : this.width+radius*3,
      y,
      baseY:y,
      vx:(fromLeft?1:-1)*speed,
      dir:fromLeft?1:-1,
      radius,
      depth,
      gait:Math.random()*Math.PI*2,
      state:"dash",
      stateClock:.25+Math.random()*.65,
      zig:Math.random()<.5?-1:1,
      life:9,
      squash:0,
      value: Math.random()<.055 ? 50 : 10
    });
  }

  updateRat(r,dt) {
    r.life -= dt;
    r.gait += dt*(12 + Math.abs(r.vx)*.025);
    r.stateClock -= dt;
    r.squash = Math.max(0,r.squash-dt*5);

    if (r.stateClock <= 0) {
      const roll = Math.random();
      if (roll < .18) {
        r.state = "pause";
        r.stateClock = .10+Math.random()*.28;
      } else if (roll < .52) {
        r.state = "zig";
        r.zig *= -1;
        r.stateClock = .22+Math.random()*.5;
      } else {
        r.state = "dash";
        r.stateClock = .28+Math.random()*.7;
        r.vx *= 1.03+Math.random()*.08;
      }
    }

    const speedScale = r.state==="pause" ? .12 : r.state==="dash" ? 1.08 : .82;
    r.x += r.vx*speedScale*dt;
    const footWobble = Math.sin(r.gait)*2.5*r.depth;
    const zig = r.state==="zig" ? r.zig*38*r.depth : 0;
    r.y += (r.baseY + footWobble + zig - r.y)*Math.min(1,dt*8);
  }

  pointer(event) {
    if (!this.running) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX-rect.left)*(this.width/rect.width);
    const y = (event.clientY-rect.top)*(this.height/rect.height);

    for (let i=this.rats.length-1;i>=0;i--) {
      const r = this.rats[i];
      if (Math.hypot(x-r.x,y-r.y) < r.radius*1.7) {
        this.rats.splice(i,1);
        this.combo += 1;
        this.comboClock = 1.15;
        const earned = r.value + Math.min(this.combo,12)*2;
        this.score += earned;
        r.squash = 1;
        this.burst(r.x,r.y,r.value===50?"#ffe66d":"#f6e4c3",r.value===50?28:16);
        this.floaters.push({x:r.x,y:r.y-r.radius,text:`+${earned}`,life:.9,big:r.value===50});
        this.shake = Math.max(this.shake,r.value===50?13:this.combo>=10?7:2);
        ratHitSound(this.combo);
        if (r.value===50) this.hooks.onAnnouncement?.("GOLDEN RAT!");
        else if (this.combo===10) this.hooks.onAnnouncement?.("RAT MANIA!");
        this.hooks.onScore?.(Math.floor(this.score),this.combo);
        return;
      }
    }

    this.combo = 0;
    this.comboClock = 0;
    this.hooks.onScore?.(Math.floor(this.score),0);
  }

  burst(x,y,color,count) {
    for (let i=0;i<count;i++) {
      const a=Math.random()*Math.PI*2,s=35+Math.random()*125;
      this.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.35+Math.random()*.45,color,size:2+Math.random()*4});
    }
  }

  roadEdges(y) {
    const horizonY=this.height*.29, bottomY=this.height*1.04;
    const t=Math.max(0,Math.min(1,(y-horizonY)/(bottomY-horizonY)));
    const half=this.width*(.10 + t*.40);
    return {left:this.width*.5-half,right:this.width*.5+half,t};
  }

  drawStaticPreview() {
    this.draw();
  }

  draw() {
    const c=this.ctx,w=this.width,h=this.height;
    c.save();
    if (this.shake>0) c.translate((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake);

    // SKY — stable background.
    const sky=c.createLinearGradient(0,0,0,h*.48);
    sky.addColorStop(0,"#547eaa");sky.addColorStop(.65,"#a6bdd0");sky.addColorStop(1,"#d7b58c");
    c.fillStyle=sky;c.fillRect(0,0,w,h);

    // FAR SKYLINE — slowest parallax layer.
    const skylineDrift=(this.worldScroll*.025)%(w/15);
    c.fillStyle="#496075";
    for(let i=-1;i<17;i++){
      const bw=w/15+8,bh=38+((i+16)%5)*14;
      c.fillRect(i*w/15-5-skylineDrift,h*.27-bh,bw,bh);
    }
    c.fillStyle="#2f465b";
    c.fillRect(w*.11-skylineDrift*.35,h*.13,22,h*.14);
    c.fillRect(w*.105-skylineDrift*.35,h*.12,32,8);

    // BACKGROUND ROWHOUSES — slow parallax, visually anchored.
    const houseTop=h*.18,houseBottom=h*.42;
    const houseDrift=(this.worldScroll*.045)%36;
    const colors=["#8d5148","#754941","#945c4e","#71504a","#96594b"];
    for(const side of[-1,1]){
      const start=side<0?0:w*.70;
      const end=side<0?w*.30:w;
      const count=6;
      for(let i=-1;i<count+1;i++){
        const x=start+(end-start)*i/count + (side<0?-houseDrift:houseDrift);
        const bw=(end-start)/count+3;
        const bh=houseBottom-houseTop-(((i+12)%3)*10);
        c.fillStyle=colors[((i+10)+(side>0?2:0))%colors.length];
        c.fillRect(x,houseBottom-bh,bw,bh);
        c.fillStyle="rgba(20,32,43,.72)";
        for(let row=0;row<3;row++) for(let col=0;col<2;col++){
          c.fillRect(x+9+col*(bw*.48),houseBottom-bh+20+row*34,12,18);
        }
        c.fillStyle="#c5b8a6";
        c.fillRect(x+bw*.39,houseBottom-36,bw*.22,36);
      }
    }

    // TREE LINE — medium parallax, flowing toward the viewer.
    for(let i=0;i<10;i++){
      const side=i%2?-1:1;
      const band=(i%5)/5;
      const phase=((band + (this.worldScroll*.00034))%1);
      const y=h*(.31 + phase*.28);
      const edge=this.roadEdges(y);
      const scale=.55+edge.t*.72;
      const x=side<0?edge.left-34*scale:edge.right+34*scale;
      c.save();c.translate(x,y);c.scale(scale,scale);
      c.fillStyle="#584632";c.fillRect(-3,-24,6,27);
      c.fillStyle="#3f6545";c.beginPath();c.arc(0,-31,15,0,Math.PI*2);c.fill();
      c.restore();
    }

    // SIDEWALKS with perspective and curb shadows.
    const horizon=this.roadEdges(h*.29),bottom=this.roadEdges(h*1.04);
    c.fillStyle="#b7aea3";
    c.beginPath();c.moveTo(0,h*.29);c.lineTo(horizon.left,h*.29);c.lineTo(bottom.left,h);c.lineTo(0,h);c.closePath();c.fill();
    c.beginPath();c.moveTo(horizon.right,h*.29);c.lineTo(w,h*.29);c.lineTo(w,h);c.lineTo(bottom.right,h);c.closePath();c.fill();

    // Brick seams move with perspective at a sidewalk speed.
    c.strokeStyle="rgba(85,64,57,.18)";c.lineWidth=1;
    const brickOffset=(this.worldScroll*.58)%34;
    for(let y=h*.34-brickOffset;y<h+34;y+=34){
      if(y<h*.31)continue;
      const edge=this.roadEdges(y);
      c.beginPath();c.moveTo(0,y);c.lineTo(edge.left,y);c.moveTo(edge.right,y);c.lineTo(w,y);c.stroke();
    }

    // Curbs.
    c.strokeStyle="#ddd4c8";c.lineWidth=7;
    c.beginPath();c.moveTo(horizon.left,h*.29);c.lineTo(bottom.left,h);c.stroke();
    c.beginPath();c.moveTo(horizon.right,h*.29);c.lineTo(bottom.right,h);c.stroke();
    c.strokeStyle="rgba(0,0,0,.25)";c.lineWidth=9;
    c.beginPath();c.moveTo(horizon.left+4,h*.29);c.lineTo(bottom.left+4,h);c.stroke();
    c.beginPath();c.moveTo(horizon.right-4,h*.29);c.lineTo(bottom.right-4,h);c.stroke();

    // ROAD.
    const road=c.createLinearGradient(0,h*.29,0,h);
    road.addColorStop(0,"#4a5057");road.addColorStop(1,"#25292e");
    c.fillStyle=road;c.beginPath();c.moveTo(horizon.left,h*.29);c.lineTo(horizon.right,h*.29);c.lineTo(bottom.right,h);c.lineTo(bottom.left,h);c.closePath();c.fill();

    // Road texture — deterministic and scrolling toward the viewer.
    c.fillStyle="rgba(255,255,255,.035)";
    for(let i=0;i<90;i++){
      const seed=(i*97)%997;
      const phase=((seed/997 + this.worldScroll*.00062)%1);
      const y=h*(.31 + phase*.69);
      const edge=this.roadEdges(y);
      const x=edge.left + ((i*53)%101)/101*(edge.right-edge.left);
      c.fillRect(x,y,1+edge.t*3,1+edge.t*2);
    }

    // Perspective lane markings move and grow as they approach.
    c.strokeStyle="#d8c86a";c.lineCap="round";
    const dashCycle=92;
    const dashOffset=(this.worldScroll*.85)%dashCycle;
    for(let y=h*.33-dashOffset;y<h+dashCycle;y+=dashCycle){
      if(y<h*.30)continue;
      const edge=this.roadEdges(y);
      const t=edge.t;
      const nextY=Math.min(h,y+18+52*t);
      c.lineWidth=1.5+6*t;
      c.beginPath();c.moveTo(w*.5,y);c.lineTo(w*.5,nextY);c.stroke();
    }

    // Street furniture uses the strongest sidewalk parallax.
    for(let i=0;i<8;i++){
      const phase=((i/8 + this.worldScroll*.00048)%1);
      const y=h*(.34+phase*.63);
      const edge=this.roadEdges(y),scale=.38+edge.t*.95,side=i%2?-1:1;
      const x=side<0?edge.left-23*scale:edge.right+23*scale;
      c.save();c.translate(x,y);c.scale(scale,scale);
      if(i%3===0){
        c.fillStyle="#bd3d34";c.fillRect(-6,-20,12,25);c.fillRect(-11,-12,22,7);
        c.beginPath();c.arc(0,-20,7,Math.PI,0);c.fill();
      } else if(i%3===1){
        c.fillStyle="#4a3428";c.fillRect(-20,-9,40,6);c.fillRect(-16,-3,4,14);c.fillRect(12,-3,4,14);
      } else {
        c.strokeStyle="#17191d";c.lineWidth=4;c.beginPath();c.moveTo(0,7);c.lineTo(0,-43);c.quadraticCurveTo(0,-54,11,-54);c.stroke();
        c.fillStyle="#ffe5a0";c.beginPath();c.arc(12,-54,5,0,Math.PI*2);c.fill();
      }
      c.restore();
    }

    // Rats and effects sorted by depth.
    const sorted=[...this.rats].sort((a,b)=>a.y-b.y);
    for(const r of sorted) this.drawRat(r);
    for(const p of this.particles){
      c.globalAlpha=Math.max(0,p.life/.8);c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.size,0,Math.PI*2);c.fill();
    }
    c.globalAlpha=1;
    for(const f of this.floaters){
      c.globalAlpha=Math.max(0,f.life/.9);
      c.fillStyle=f.big?"#ffe66d":"#fff";
      c.font=`1000 ${f.big?30:21}px system-ui`;
      c.textAlign="center";c.shadowColor="#000";c.shadowBlur=5;c.fillText(f.text,f.x,f.y);
    }
    c.globalAlpha=1;c.shadowBlur=0;
    c.restore();
  }

  drawRat(r) {
    const c=this.ctx;
    c.save();c.translate(r.x,r.y);c.scale(r.dir,1);
    const stride=Math.sin(r.gait),bob=Math.abs(Math.sin(r.gait))*2.2*r.depth;
    c.translate(0,-bob);
    const gold=r.value===50;
    c.fillStyle="rgba(0,0,0,.28)";c.beginPath();c.ellipse(0,r.radius*.68,r.radius*1.1,r.radius*.25,0,0,Math.PI*2);c.fill();

    // Tail.
    c.strokeStyle=gold?"#eac953":"#a98077";c.lineWidth=Math.max(1.5,r.radius*.11);c.lineCap="round";
    c.beginPath();c.moveTo(-r.radius*.8,2);c.quadraticCurveTo(-r.radius*1.65,-r.radius*.6,-r.radius*1.9,r.radius*.3);c.stroke();

    // Back legs visibly cycle.
    c.strokeStyle=gold?"#d7ae31":"#66504b";c.lineWidth=Math.max(2,r.radius*.18);
    c.beginPath();
    c.moveTo(-r.radius*.25,r.radius*.35);c.lineTo(-r.radius*.55+stride*r.radius*.35,r.radius*.85);
    c.moveTo(r.radius*.25,r.radius*.35);c.lineTo(r.radius*.55-stride*r.radius*.35,r.radius*.85);
    c.stroke();

    // Body/head.
    c.fillStyle=gold?"#e7b92d":"#655e5b";
    c.beginPath();c.ellipse(0,0,r.radius*1.02,r.radius*.66,-.04,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(r.radius*.72,-r.radius*.15,r.radius*.55,r.radius*.47,0,0,Math.PI*2);c.fill();

    // Ear, eye, nose.
    c.fillStyle=gold?"#f6dc77":"#d39a95";c.beginPath();c.arc(r.radius*.58,-r.radius*.52,r.radius*.19,0,Math.PI*2);c.fill();
    c.fillStyle="#101010";c.beginPath();c.arc(r.radius*.92,-r.radius*.22,Math.max(1.5,r.radius*.1),0,Math.PI*2);c.fill();
    c.fillStyle="#db9b97";c.beginPath();c.arc(r.radius*1.23,-r.radius*.08,Math.max(1.5,r.radius*.1),0,Math.PI*2);c.fill();

    // Whiskers.
    c.strokeStyle="rgba(245,235,220,.7)";c.lineWidth=1;
    c.beginPath();c.moveTo(r.radius*1.1,-2);c.lineTo(r.radius*1.6,-r.radius*.25);
    c.moveTo(r.radius*1.1,1);c.lineTo(r.radius*1.65,r.radius*.12);c.stroke();

    if(gold){
      c.fillStyle="#fff3a6";c.font=`900 ${Math.max(10,r.radius*.7)}px system-ui`;c.fillText("★",-3,-r.radius*.75);
    }
    c.restore();
  }
}
