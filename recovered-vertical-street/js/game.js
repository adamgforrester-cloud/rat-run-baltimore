
import { ratHitSound, countdownSound, startSound } from "./audio.js";

export class RatRunGame {
  constructor(canvas, hooks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.hooks = hooks;
    this.running = false;
    this.duration = 45;
    this.score = 0;
    this.combo = 0;
    this.comboClock = 0;
    this.elapsed = 0;
    this.rats = [];
    this.particles = [];
    this.floaters = [];
    this.tapRings = [];
    this.pickups = [];
    this.hazards = [];
    this.powerSpawnClock = 3.2;
    this.hazardSpawnClock = 6.2;
    this.nextPowerType = "cheese";
    this.nextHazardType = "pedestrian";
    this.effects = { cheese: 0, coffee: 0 };
    this.mistakes = { pedestrian: 0, dog: 0 };
    this.spawnClock = 0;
    this.minimumRats = 6;
    this.maximumRats = 11;
    this.last = 0;
    this.shake = 0;
    this.lastCountdown = null;
    this.districtIndex = -1;
    this.worldScroll = 0;
    this.lastSpawnSide = Math.random() < .5 ? -1 : 1;
    this.streetArts = [
      "./public/assets/baltimore-street.webp",
      "./public/assets/baltimore-downtown.webp",
      "./public/assets/baltimore-harbor-v3.webp"
    ].map(src => {
      const image=new Image();
      image.decoding="async";
      image.onload=()=>this.drawStaticPreview();
      image.src=src;
      return image;
    });
    // Each generated scene places its road at a slightly different point.
    // Small offsets keep the full artwork visible while joining the road centers.
    this.streetCalibrations = [
      { offsetX: 0, offsetY: 0, zoom: 1 },
      { offsetX: 0, offsetY: 0, zoom: 1 },
      { offsetX: .045, offsetY: .12, zoom: 1.05 }
    ];
    // Each painted district has different road geometry. These normalized
    // trapezoids keep rats inside the playable pavement in that artwork.
    this.roadZones = [
      { horizon: .30, bottom: 1.02, centerTop: .50, centerBottom: .50, halfTop: .11, halfBottom: .43, spawnMin: .48, ratMin: 9, ratMax: 24 },
      { horizon: .69, bottom: 1.02, centerTop: .58, centerBottom: .52, halfTop: .015, halfBottom: .22, spawnMin: .78, ratMin: 8, ratMax: 19 },
      { horizon: .69, bottom: 1.02, centerTop: .52, centerBottom: .49, halfTop: .015, halfBottom: .18, spawnMin: .78, ratMin: 7, ratMax: 15 }
    ];
    this.ratLanes=[.20,.35,.50,.65,.80];
    this.streetArt = this.streetArts[0];
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
    this.tapRings = [];
    this.pickups = [];
    this.hazards = [];
    this.powerSpawnClock = 3.2;
    this.hazardSpawnClock = 6.2;
    this.nextPowerType = "cheese";
    this.nextHazardType = "pedestrian";
    this.effects = { cheese: 0, coffee: 0 };
    this.mistakes = { pedestrian: 0, dog: 0 };
    this.spawnClock = .15;
    this.shake = 0;
    this.lastCountdown = null;
    this.districtIndex = -1;
    this.worldScroll = 0;
    this.lastSpawnSide = Math.random() < .5 ? -1 : 1;
    this.last = performance.now();
    startSound();
    this.hooks.onScore?.(0,0);
    this.hooks.onTime?.(45);
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
    const district=Math.min(2,Math.floor(this.elapsed/15));
    if (district!==this.districtIndex) {
      const previousDistrict=this.districtIndex;
      this.districtIndex=district;
      if(previousDistrict>=0){
        const zone=this.roadZones[district];
        for(const rat of this.rats){
          rat.baseY=Math.max(this.height*zone.spawnMin,Math.min(this.height*.94,rat.baseY));
          rat.laneGoal=Math.max(this.height*zone.spawnMin,Math.min(this.height*.94,rat.laneGoal));
          rat.y=Math.max(this.height*zone.spawnMin,Math.min(this.height*.95,rat.y));
          const bounds=this.roadEdges(rat.y,district);
          rat.x=Math.max(bounds.left+rat.radius,Math.min(bounds.right-rat.radius,rat.x));
        }
      }
      this.hooks.onDistrict?.(district,["THE ROWHOUSES","DOWNTOWN","INNER HARBOR"][district]);
    }
    this.hooks.onTime?.(Math.ceil(remaining));
    const n = Math.ceil(remaining);
    if (n <= 10 && n > 0 && n !== this.lastCountdown) {
      this.lastCountdown = n;
      countdownSound(n);
      this.hooks.onCountdown?.(n);
    }
    if (remaining <= 0) return this.stop();

    this.effects.cheese=Math.max(0,this.effects.cheese-dt);
    this.effects.coffee=Math.max(0,this.effects.coffee-dt);
    this.mistakes.pedestrian=Math.max(0,this.mistakes.pedestrian-dt);
    this.mistakes.dog=Math.max(0,this.mistakes.dog-dt);

    this.powerSpawnClock-=dt;
    if(this.powerSpawnClock<=0 && this.pickups.length<2){
      this.spawnStreetItem("power",this.nextPowerType);
      this.nextPowerType=this.nextPowerType==="cheese"?"coffee":"cheese";
      this.powerSpawnClock=4.0;
    }
    this.hazardSpawnClock-=dt;
    if(this.hazardSpawnClock<=0 && this.hazards.length<2){
      this.spawnStreetItem("hazard",this.nextHazardType);
      this.nextHazardType=this.nextHazardType==="pedestrian"?"dog":"pedestrian";
      this.hazardSpawnClock=3.8;
    }
    for(const item of [...this.pickups,...this.hazards]){
      item.life-=dt;
      item.bob+=dt*4;
      item.y+=dt*(7+item.depth*8);
      const bounds=this.roadEdges(item.y);
      item.x=bounds.left+(bounds.right-bounds.left)*item.laneRatio;
    }
    this.pickups=this.pickups.filter(item=>item.life>0&&item.y<this.height*.96);
    this.hazards=this.hazards.filter(item=>item.life>0&&item.y<this.height*.96);

    this.comboClock -= dt;
    if (this.comboClock <= 0 && this.combo) {
      this.combo = 0;
      this.hooks.onScore?.(Math.floor(this.score),this.combo);
    }

    this.spawnClock -= dt;
    const desired = Math.min(this.maximumRats, this.minimumRats + Math.floor(this.elapsed/7));
    if (this.spawnClock <= 0 && this.rats.length < desired) {
      this.spawnRat();
      this.spawnClock = Math.max(.16,.34-this.elapsed*.004);
    }

    for (const rat of this.rats) this.updateRat(rat,dt);
    this.separateRats(dt);
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
    for (const ring of this.tapRings) {
      ring.life -= dt;
      ring.radius += dt * ring.speed;
    }
    this.tapRings = this.tapRings.filter(ring => ring.life > 0);
    this.shake = Math.max(0,this.shake-dt*34);
  }

  spawnRat() {
    const fromLeft = Math.random() < .72 ? this.lastSpawnSide > 0 : Math.random() < .5;
    this.lastSpawnSide = fromLeft ? -1 : 1;
    const zone=this.roadZones[Math.max(0,this.districtIndex)];
    const horizon = this.height*zone.horizon;
    const roadBottom = this.height*zone.bottom;
    const routeRoll=Math.random();
    const motion=routeRoll<.52?"across":routeRoll<.72?"toward":routeRoll<.88?"away":"diagonal";
    const yCandidates=motion==="toward"||motion==="diagonal"
      ? [zone.spawnMin+.01,zone.spawnMin+.035,zone.spawnMin+.065]
      : motion==="away" ? [.90,.925,.95]
      : Array.from({length:8},()=>zone.spawnMin+Math.random()*(.95-zone.spawnMin));
    const yRatio=yCandidates.reduce((best,candidate)=>{
      const clearance=this.rats.reduce((nearest,rat)=>Math.min(nearest,Math.abs(rat.y/this.height-candidate)),1);
      return clearance>best.clearance?{value:candidate,clearance}:best;
    },{value:yCandidates[0],clearance:-1}).value;
    let y=this.height*yRatio;
    const depth = Math.max(0,Math.min(1,(y-horizon)/(roadBottom-horizon)));
    const radius = this.ratRadius(depth,Math.max(0,this.districtIndex));
    const road = this.roadEdges(y);
    const edgePadding = radius*1.4;
    const districtBoost=1+Math.min(2,Math.floor(this.elapsed/15))*.14;
    const speed = (105 + depth*125 + Math.random()*55)*districtBoost;
    const shuffledLanes=[...this.ratLanes].sort(()=>Math.random()-.5);
    const laneRatio=shuffledLanes.reduce((best,candidate)=>{
      const crowd=this.rats.reduce((score,rat)=>{
        const laneDistance=Math.abs((rat.laneRatio??.5)-candidate);
        const depthDistance=Math.abs(rat.y-y)/this.height;
        return score+Math.max(0,.30-laneDistance)*Math.max(0,.20-depthDistance);
      },0);
      return crowd<best.crowd?{value:candidate,crowd}:best;
    },{value:shuffledLanes[0],crowd:Infinity}).value;
    const verticalDirection=motion==="away"?-1:1;
    const verticalSpeed=(42+Math.random()*42)*districtBoost*verticalDirection;
    const diagonalDirection=Math.random()<.5?-1:1;
    const coats=[
      {body:"#655e5b",dark:"#4b4543",belly:"#8a807c",ear:"#d39a95",tail:"#a98077"},
      {body:"#795746",dark:"#563c31",belly:"#9b7460",ear:"#d59a8c",tail:"#b27e73"},
      {body:"#45484b",dark:"#2f3235",belly:"#6a6e70",ear:"#ba8b8d",tail:"#8d6f73"},
      {body:"#8b7b68",dark:"#66594a",belly:"#ad9b82",ear:"#dda69d",tail:"#b78d83"}
    ];
    this.rats.push({
      x: motion==="across"
        ? (fromLeft ? road.left+edgePadding : road.right-edgePadding)
        : road.left+(road.right-road.left)*laneRatio,
      y,
      baseY:y,
      vx:(fromLeft?1:-1)*speed,
      dir:fromLeft?1:-1,
      motion,
      vy:verticalSpeed,
      laneRatio,
      laneVelocity:motion==="diagonal"?diagonalDirection*(.22+Math.random()*.14):(Math.random()-.5)*.025,
      laneHome:laneRatio,
      radius,
      depth,
      gait:Math.random()*Math.PI*2,
      state:"dash",
      stateClock:.20+Math.random()*.55,
      zig:Math.random()<.5?-1:1,
      laneGoal:y,
      panicClock:1.2+Math.random()*2.6,
      look:Math.random()*Math.PI*2,
      turn:0,
      life:9,
      squash:0,
      coat:coats[Math.floor(Math.random()*coats.length)],
      sizeWobble:.92+Math.random()*.18,
      value: Math.random()<.055 ? 50 : 10
    });
  }

  updateRat(r,dt) {
    r.life -= dt;
    r.gait += dt*(13 + (Math.abs(r.vx)+Math.abs(r.vy||0))*.025);
    r.look += dt*5;
    r.stateClock -= dt;
    r.panicClock -= dt;
    r.squash = Math.max(0,r.squash-dt*5);
    r.turn += (0-r.turn)*Math.min(1,dt*9);
    const district=Math.max(0,this.districtIndex);
    const perspective=this.roadEdges(r.y,district).t;
    const desiredRadius=this.ratRadius(perspective,district);
    r.radius+=(desiredRadius-r.radius)*Math.min(1,dt*5.5);

    if (r.panicClock <= 0) {
      r.state = "panic";
      r.stateClock = .20 + Math.random()*.28;
      r.panicClock = 1.8 + Math.random()*3.2;
      const zone=this.roadZones[Math.max(0,this.districtIndex)];
      r.laneGoal = Math.max(this.height*zone.spawnMin, Math.min(this.height*.93, r.baseY + (Math.random()-.5)*90*r.depth));
      r.turn = (Math.random()<.5?-1:1)*.22;
    } else if (r.stateClock <= 0) {
      const roll = Math.random();
      if (roll < .16) {
        r.state = "pause";
        r.stateClock = .08 + Math.random()*.20;
      } else if (roll < .46) {
        r.state = "weave";
        r.zig *= -1;
        const zone=this.roadZones[Math.max(0,this.districtIndex)];
        r.laneGoal = Math.max(this.height*zone.spawnMin, Math.min(this.height*.94, r.baseY + r.zig*(18+Math.random()*38)*r.depth));
        r.turn = r.zig*.12;
        r.stateClock = .24 + Math.random()*.48;
      } else {
        r.state = "dash";
        r.stateClock = .24 + Math.random()*.58;
      }
    }

    const speedScale = (this.effects.cheese>0 ? .04 : 1) * (
      r.state==="pause" ? .10 :
      r.state==="panic" ? 1.62 :
      r.state==="dash" ? 1.08 : .82);

    if(r.motion==="across"){
      r.x += r.vx*speedScale*dt;
      const footWobble = Math.sin(r.gait)*2.7*r.depth;
      const targetY = r.state==="weave" || r.state==="panic" ? r.laneGoal : r.baseY;
      r.y += (targetY + footWobble - r.y)*Math.min(1,dt*(r.state==="panic"?13:8));
      const bounds=this.roadEdges(r.y);
      const pad=r.radius*.72;
      if(r.dir>0 && r.x>=bounds.right-pad) r.life=0;
      if(r.dir<0 && r.x<=bounds.left+pad) r.life=0;
      return;
    }

    const zone=this.roadZones[Math.max(0,this.districtIndex)];
    r.y += r.vy*speedScale*dt;
    r.laneRatio += r.laneVelocity*speedScale*dt;
    if(r.laneRatio<.18||r.laneRatio>.82){
      r.laneRatio=Math.max(.18,Math.min(.82,r.laneRatio));
      r.laneVelocity*=-1;
      r.dir=r.laneVelocity>=0?1:-1;
    }
    const bounds=this.roadEdges(r.y);
    const targetX=bounds.left+(bounds.right-bounds.left)*r.laneRatio;
    r.x += (targetX-r.x)*Math.min(1,dt*(r.state==="panic"?8:4.8));
    r.depth=bounds.t;
    r.turn+=(r.laneVelocity*.75-r.turn)*Math.min(1,dt*4);
    r.baseY=r.y;
    r.laneGoal=r.y;
    if(r.y>=this.height*.955||r.y<=this.height*(zone.spawnMin-.01)) r.life=0;
  }

  separateRats(dt) {
    for(let i=0;i<this.rats.length;i++){
      const a=this.rats[i];
      if(!a||a.life<=0)continue;
      for(let j=i+1;j<this.rats.length;j++){
        const b=this.rats[j];
        if(!b||b.life<=0)continue;
        const dx=b.x-a.x,dy=b.y-a.y;
        const distance=Math.hypot(dx,dy)||.001;
        const gap=(a.radius+b.radius)*1.28;
        if(distance>=gap)continue;
        const push=(gap-distance)*Math.min(1,dt*12)*.58;
        const nx=dx/distance,ny=dy/distance;
        a.x-=nx*push;b.x+=nx*push;
        a.y-=ny*push*.28;b.y+=ny*push*.28;
        for(const rat of[a,b]){
          const zone=this.roadZones[Math.max(0,this.districtIndex)];
          rat.y=Math.max(this.height*zone.spawnMin,Math.min(this.height*.95,rat.y));
          const bounds=this.roadEdges(rat.y);
          rat.x=Math.max(bounds.left+rat.radius*.7,Math.min(bounds.right-rat.radius*.7,rat.x));
        }
      }
    }
  }

  pointer(event) {
    if (!this.running) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX-rect.left)*(this.width/rect.width);
    const y = (event.clientY-rect.top)*(this.height/rect.height);

    for(let i=this.pickups.length-1;i>=0;i--){
      const item=this.pickups[i];
      if(Math.hypot(x-item.x,y-item.y)<Math.max(34,item.radius*1.7)){
        this.pickups.splice(i,1);
        this.activatePower(item);
        return;
      }
    }
    for(let i=this.hazards.length-1;i>=0;i--){
      const item=this.hazards[i];
      if(Math.hypot(x-item.x,y-item.y)<Math.max(38,item.radius*1.7)){
        this.hazards.splice(i,1);
        this.hitHazard(item);
        return;
      }
    }

    for (let i=this.rats.length-1;i>=0;i--) {
      const r = this.rats[i];
      if (Math.hypot(x-r.x,y-r.y) < Math.max(28,r.radius*2.05)) {
        this.rats.splice(i,1);
        this.combo += 1;
        this.comboClock = 1.15;
        const multiplier=this.effects.cheese>0&&this.effects.coffee>0 ? 3 : this.effects.coffee>0 ? 2 : 1;
        const earned = (r.value + Math.min(this.combo,12)*2)*multiplier;
        this.score += earned;
        r.squash = 1;
        this.burst(r.x,r.y,r.value===50?"#ffe66d":"#f6e4c3",r.value===50?36:22);
        this.floaters.push({x:r.x,y:r.y-r.radius,text:`+${earned}`,life:.9,big:r.value===50});
        this.tapRings.push({x:r.x,y:r.y,radius:r.radius*.7,life:.48,maxLife:.48,speed:145,color:r.value===50?"#ffe66d":"#ff6b57",hit:true});
        this.shake = Math.max(this.shake,r.value===50?15:this.combo>=10?9:3.5);
        ratHitSound(this.combo);
        if (navigator.vibrate) navigator.vibrate(r.value===50 ? [24,28,32] : Math.min(28,10+this.combo));
        if (r.value===50) this.hooks.onAnnouncement?.("GOLDEN RAT!");
        else if (this.combo===10) this.hooks.onAnnouncement?.("RAT MANIA!");
        this.hooks.onScore?.(Math.floor(this.score),this.combo);
        return;
      }
    }

    this.combo = 0;
    this.comboClock = 0;
    this.tapRings.push({x,y,radius:8,life:.30,maxLife:.30,speed:90,color:"#b9d8e8",hit:false});
    this.hooks.onScore?.(Math.floor(this.score),0);
  }

  burst(x,y,color,count) {
    for (let i=0;i<count;i++) {
      const a=Math.random()*Math.PI*2,s=35+Math.random()*125;
      this.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.35+Math.random()*.45,color,size:2+Math.random()*4});
    }
  }

  roadEdges(y,district=this.districtIndex) {
    const zone=this.roadZones[Math.max(0,Math.min(2,district))];
    const horizonY=this.height*zone.horizon, bottomY=this.height*zone.bottom;
    const t=Math.max(0,Math.min(1,(y-horizonY)/(bottomY-horizonY)));
    const center=this.width*(zone.centerTop+(zone.centerBottom-zone.centerTop)*t);
    const half=this.width*(zone.halfTop+(zone.halfBottom-zone.halfTop)*t);
    return {left:center-half,right:center+half,t};
  }

  spawnStreetItem(kind,type) {
    const zone=this.roadZones[Math.max(0,this.districtIndex)];
    const y=this.height*(zone.spawnMin+.04+Math.random()*.10);
    const bounds=this.roadEdges(y);
    const laneRatio=.25+Math.random()*.50;
    const depth=bounds.t;
    const item={kind,type,y,x:bounds.left+(bounds.right-bounds.left)*laneRatio,laneRatio,depth,radius:18+depth*7,life:7.5,bob:Math.random()*Math.PI*2};
    (kind==="power"?this.pickups:this.hazards).push(item);
  }

  activatePower(item) {
    this.effects[item.type]=Math.max(this.effects[item.type],5.5);
    const stacked=this.effects.cheese>0&&this.effects.coffee>0;
    const points=stacked?75:25;
    this.score+=points;
    this.burst(item.x,item.y,item.type==="cheese"?"#ffd95c":"#d9a36c",28);
    this.floaters.push({x:item.x,y:item.y-24,text:`+${points}`,life:.9,big:stacked});
    this.hooks.onAnnouncement?.(stacked?"RAT TRAP RUSH — 3× SCORE!":item.type==="cheese"?"CHEESE FREEZE!":"COFFEE — 2× SCORE!");
    this.hooks.onScore?.(Math.floor(this.score),this.combo);
  }

  hitHazard(item) {
    const other=item.type==="pedestrian"?"dog":"pedestrian";
    const stacked=this.mistakes[other]>0;
    this.mistakes[item.type]=4.5;
    const penalty=stacked?100:item.type==="dog"?50:35;
    this.score=Math.max(0,this.score-penalty);
    this.combo=0;
    this.comboClock=0;
    this.burst(item.x,item.y,"#ff645b",24);
    this.floaters.push({x:item.x,y:item.y-24,text:`−${penalty}`,life:.9,big:stacked});
    this.hooks.onAnnouncement?.(stacked?"PUBLIC OUTRAGE — −100!":item.type==="dog"?"WATCH THE DOG!":"WATCH THE PEDESTRIAN!");
    this.hooks.onScore?.(Math.floor(this.score),0);
  }

  ratRadius(depth,district=this.districtIndex) {
    const zone=this.roadZones[Math.max(0,Math.min(2,district))];
    const eased=Math.pow(Math.max(0,Math.min(1,depth)),.82);
    return zone.ratMin+(zone.ratMax-zone.ratMin)*eased;
  }

  drawStaticPreview() {
    this.draw();
  }

  draw() {
    const c=this.ctx,w=this.width,h=this.height;
    c.save();
    if (this.shake>0) c.translate((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake);

    if (this.streetArts.every(image => image.complete && image.naturalWidth)) {
      this.drawStreetArt(c,w,h);
      this.drawActorsAndEffects(c);
      if (this.cinematicTransition) this.drawDistrictCard(c,w,h,this.cinematicTransition);
      c.restore();
      return;
    }

    // SKY — stable background.
    const sky=c.createLinearGradient(0,0,0,h*.48);
    sky.addColorStop(0,"#527fae");sky.addColorStop(.58,"#a7c0d3");sky.addColorStop(1,"#edbc82");
    c.fillStyle=sky;c.fillRect(0,0,w,h);
    const haze=c.createLinearGradient(0,h*.17,0,h*.43);
    haze.addColorStop(0,"rgba(255,210,158,0)");
    haze.addColorStop(1,"rgba(255,210,158,.28)");
    c.fillStyle=haze;c.fillRect(0,h*.16,w,h*.30);

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

    // Baltimore-flavored rooftop silhouettes.
    c.fillStyle="#33495d";
    // church steeple
    c.beginPath();c.moveTo(w*.82,h*.25);c.lineTo(w*.835,h*.12);c.lineTo(w*.85,h*.25);c.closePath();c.fill();
    c.fillRect(w*.828,h*.20,w*.014,h*.07);
    // water tank
    c.fillRect(w*.63,h*.205,w*.045,h*.045);
    c.fillRect(w*.635,h*.195,w*.035,h*.012);
    c.fillRect(w*.639,h*.25,3,h*.035);c.fillRect(w*.667,h*.25,3,h*.035);
    // rooftop sign — positioned above the rowhouses so it remains readable.
    const signX=w*.34-skylineDrift*.12,signY=h*.145,signW=w*.13,signH=h*.052;
    c.fillStyle="rgba(20,32,44,.82)";c.fillRect(signX-signW/2,signY-signH/2,signW,signH);
    c.strokeStyle="#f3c95e";c.lineWidth=3;c.strokeRect(signX-signW/2,signY-signH/2,signW,signH);
    c.fillStyle="#ffe47e";c.font=`1000 ${Math.max(12,w*.016)}px system-ui`;c.textAlign="center";
    c.shadowColor="rgba(255,221,104,.55)";c.shadowBlur=12;
    c.fillText("CHARM CITY",signX,signY+5);c.shadowBlur=0;

    // Industrial waterfront-style neon anchor.
    const sugarX=w*.69, sugarY=h*.165;
    c.strokeStyle="#c7d9e6";c.lineWidth=2;
    c.beginPath();c.moveTo(sugarX,sugarY+22);c.lineTo(sugarX,sugarY-18);c.stroke();
    c.fillStyle="#ef5850";c.font=`1000 ${Math.max(10,w*.013)}px system-ui`;c.textAlign="center";
    c.shadowColor="rgba(239,88,80,.65)";c.shadowBlur=12;
    c.fillText("SUGARS",sugarX,sugarY);c.shadowBlur=0;

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
    const roadHaze=c.createLinearGradient(0,h*.28,0,h*.48);
    roadHaze.addColorStop(0,"rgba(205,215,222,.35)");
    roadHaze.addColorStop(1,"rgba(205,215,222,0)");
    c.fillStyle=roadHaze;
    c.beginPath();c.moveTo(horizon.left,h*.29);c.lineTo(horizon.right,h*.29);
    c.lineTo(this.roadEdges(h*.48).right,h*.48);c.lineTo(this.roadEdges(h*.48).left,h*.48);c.closePath();c.fill();

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

    // Road details move with the street and establish scale.
    for(let i=0;i<7;i++){
      const phase=((i/7 + this.worldScroll*.00055)%1);
      const y=h*(.36+phase*.60);
      const edge=this.roadEdges(y);
      const t=edge.t;
      const laneSide=i%2?-1:1;
      const x=w*.5 + laneSide*(edge.right-edge.left)*(.20 + (i%3)*.08);
      c.save();c.translate(x,y);c.scale(.35+t*.95,.35+t*.95);
      if(i%3===0){
        c.fillStyle="rgba(12,15,18,.62)";c.beginPath();c.ellipse(0,0,18,7,0,0,Math.PI*2);c.fill();
        c.strokeStyle="rgba(145,155,160,.42)";c.lineWidth=2;c.stroke();
        c.beginPath();c.moveTo(-11,0);c.lineTo(11,0);c.moveTo(0,-5);c.lineTo(0,5);c.stroke();
      }else if(i%3===1){
        c.strokeStyle="rgba(12,15,18,.42)";c.lineWidth=2;
        c.beginPath();c.moveTo(-18,-2);c.lineTo(-7,4);c.lineTo(3,-3);c.lineTo(18,2);c.stroke();
      }else{
        c.fillStyle="rgba(225,220,202,.32)";c.fillRect(-7,-2,14,4);
      }
      c.restore();
    }

    // Storm drains stay beside the curb.
    for(let i=0;i<5;i++){
      const phase=((i/5 + this.worldScroll*.00046)%1);
      const y=h*(.45+phase*.50);
      const edge=this.roadEdges(y),t=edge.t,side=i%2?-1:1;
      const x=side<0?edge.left+8+18*t:edge.right-8-18*t;
      c.save();c.translate(x,y);c.scale(.35+t*.9,.35+t*.9);
      c.fillStyle="rgba(20,24,27,.78)";c.fillRect(-12,-4,24,8);
      c.strokeStyle="rgba(120,128,132,.5)";c.lineWidth=1;
      for(let k=-8;k<=8;k+=4){c.beginPath();c.moveTo(k,-3);c.lineTo(k,3);c.stroke();}
      c.restore();
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

    // Small lived-in sidewalk details.
    for(let i=0;i<9;i++){
      const phase=((i/9 + this.worldScroll*.00043)%1);
      const y=h*(.43+phase*.54);
      const edge=this.roadEdges(y),t=edge.t,side=i%2?-1:1;
      const x=side<0?edge.left-(42+38*t):edge.right+(42+38*t);
      c.save();c.translate(x,y);c.scale(.32+t*.82,.32+t*.82);
      if(i%4===0){
        c.fillStyle="rgba(45,48,50,.55)";c.beginPath();c.arc(0,0,10,0,Math.PI*2);c.fill();
        c.strokeStyle="rgba(165,160,150,.5)";c.stroke();
      }else if(i%4===1){
        c.fillStyle="#ded7c7";c.rotate(-.12);c.fillRect(-10,-5,20,10);
        c.fillStyle="#bd4c43";c.fillRect(-8,-3,9,2);
      }else if(i%4===2){
        c.fillStyle="#242426";c.beginPath();c.ellipse(0,0,12,9,0,0,Math.PI*2);c.fill();
        c.fillStyle="rgba(255,255,255,.12)";c.beginPath();c.arc(-3,-3,4,0,Math.PI*2);c.fill();
      }else{
        c.strokeStyle="#282b2f";c.lineWidth=4;c.beginPath();c.moveTo(0,7);c.lineTo(0,-24);c.stroke();
        c.fillStyle="#58616a";c.beginPath();c.roundRect(-7,-34,14,15,4);c.fill();
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

  drawStreetArt(c,w,h) {
    const progress=this.running ? Math.min(1,this.elapsed/this.duration) : 0;
    const pulse=this.running ? Math.sin(this.worldScroll*.0022)*.004 : 0;
    const districtPosition=this.running ? Math.min(2,this.elapsed/15) : 0;
    const baseIndex=Math.min(2,Math.floor(districtPosition));
    const fraction=districtPosition-baseIndex;
    // One continuous camera curve for the entire run. It never resets when
    // districtPosition crosses 1 or 2, so the player cannot appear to reverse.
    const cameraPush=progress*.13;
    const boundary=this.elapsed<15.8 ? 15 : this.elapsed<30.8 ? 30 : null;
    const transitionDuration=1.35;
    const transitionStart=boundary===null ? Infinity : boundary-transitionDuration/2;
    const transitionPhase=boundary===null ? -1 : (this.elapsed-transitionStart)/transitionDuration;
    const inTransition=this.running && transitionPhase>=0 && transitionPhase<=1;
    const outgoingIndex=boundary===null ? baseIndex : Math.max(0,boundary/15-1);
    const incomingIndex=boundary===null ? baseIndex : Math.min(2,boundary/15);
    const visibleIndex=inTransition ? (transitionPhase<.5 ? outgoingIndex : incomingIndex) : baseIndex;
    const cameraSurge=0;
    const drawLayer=(image,alpha,index,scaleShift=0,rise=0) => {
      if(alpha<=0)return;
      const calibration=this.streetCalibrations[index];
      const cover=Math.max(w/image.naturalWidth,h/image.naturalHeight);
      const scale=cover*(1.018+cameraPush+pulse+scaleShift)*calibration.zoom;
      const drawW=image.naturalWidth*scale;
      const drawH=image.naturalHeight*scale;
      const sideDrift=0;
      const horizonX=.5;
      const horizonY=.205;
      const drawX=w*horizonX-image.naturalWidth*horizonX*scale+sideDrift+w*calibration.offsetX;
      const drawY=h*horizonY-image.naturalHeight*horizonY*scale+h*calibration.offsetY+h*rise;
      c.globalAlpha=alpha;
      c.drawImage(image,drawX,drawY,drawW,drawH);
    };
    // Never show two roads at once. The cinematic cover hides the hard cut.
    drawLayer(this.streetArts[visibleIndex],1,visibleIndex,cameraSurge,0);
    c.globalAlpha=1;

    const depthShade=c.createLinearGradient(0,0,0,h);
    depthShade.addColorStop(0,"rgba(7,14,22,.05)");
    depthShade.addColorStop(.58,"rgba(4,8,13,.02)");
    depthShade.addColorStop(1,"rgba(3,6,10,.25)");
    c.fillStyle=depthShade;c.fillRect(0,0,w,h);

    if (this.running) {
      this.drawStreetMotion(c,w,h,progress);
      this.cinematicTransition=inTransition ? {
        phase:transitionPhase,
        title:["THE ROWHOUSES","DOWNTOWN","INNER HARBOR"][incomingIndex]
      } : null;
    } else {
      this.cinematicTransition=null;
    }
  }

  drawDistrictCard(c,w,h,transition) {
    const {phase,title}=transition;
    const energy=Math.sin(phase*Math.PI);
    const cover=Math.min(.92,energy*1.12);
    const shade=c.createRadialGradient(w*.5,h*.32,0,w*.5,h*.32,w*.78);
    shade.addColorStop(0,`rgba(7,12,18,${cover*.55})`);
    shade.addColorStop(1,`rgba(2,5,9,${cover})`);
    c.fillStyle=shade;c.fillRect(0,0,w,h);

    const softGlow=c.createRadialGradient(w*.5,h*.43,0,w*.5,h*.43,w*.32);
    softGlow.addColorStop(0,`rgba(255,224,171,${energy*.10})`);
    softGlow.addColorStop(1,"rgba(255,224,171,0)");
    c.fillStyle=softGlow;c.fillRect(0,0,w,h);

    const titleIn=Math.max(0,Math.min(1,(phase-.24)/.16));
    const titleOut=Math.max(0,Math.min(1,(.82-phase)/.16));
    c.globalAlpha=titleIn*titleOut;
    c.textAlign="center";
    c.shadowColor="rgba(0,0,0,.9)";c.shadowBlur=18;
    c.fillStyle="#f7e4bd";
    c.font=`900 ${Math.max(28,Math.min(58,w*.055))}px system-ui`;
    c.fillText(title,w*.5,h*.50);
    c.fillStyle="#dfb75e";
    c.font=`800 ${Math.max(11,Math.min(17,w*.016))}px system-ui`;
    c.fillText("BALTIMORE",w*.5,h*.50+34);
    c.globalAlpha=1;c.shadowBlur=0;
  }

  drawStreetMotion(c,w,h,progress) {
    const speedBoost=1+progress*1.15;

    // Small physical street objects make forward distance readable without
    // translucent speed lines drifting over the painted neighborhoods.
    for(let i=0;i<9;i++){
      const phase=((i/9+this.worldScroll*.00043*speedBoost)%1);
      const y=h*(.33+phase*.73);
      const edge=this.roadEdges(y);
      const lane=.16+(((i*29)%67)/67)*.68;
      const x=edge.left+(edge.right-edge.left)*lane;
      const size=2+phase*12;
      c.save();c.translate(x,y);c.rotate((i%2?-.22:.18)+phase*.12);
      if(i%3===0){
        c.fillStyle=`rgba(226,218,196,${.22+phase*.40})`;
        c.fillRect(-size*.75,-size*.35,size*1.5,size*.7);
        c.strokeStyle=`rgba(83,66,54,${.16+phase*.30})`;c.lineWidth=1;
        c.beginPath();c.moveTo(-size*.5,0);c.lineTo(size*.5,0);c.stroke();
      }else if(i%3===1){
        c.strokeStyle=`rgba(10,13,16,${.18+phase*.38})`;c.lineWidth=1+phase*2;
        c.beginPath();c.moveTo(-size,0);c.lineTo(-size*.2,size*.3);c.lineTo(size*.25,-size*.2);c.lineTo(size,0);c.stroke();
      }else{
        c.fillStyle=`rgba(20,24,27,${.20+phase*.46})`;
        c.beginPath();c.ellipse(0,0,size,size*.38,0,0,Math.PI*2);c.fill();
        c.strokeStyle=`rgba(145,155,160,${.18+phase*.32})`;c.lineWidth=1+phase;
        c.stroke();
      }
      c.restore();
    }

  }

  drawActorsAndEffects(c) {
    const sorted=[...this.rats].sort((a,b)=>a.y-b.y);
    for(const r of sorted) this.drawRat(r);
    for(const item of [...this.pickups,...this.hazards].sort((a,b)=>a.y-b.y)) this.drawStreetItem(item);

    for(const ring of this.tapRings){
      const alpha=Math.max(0,ring.life/ring.maxLife);
      c.globalAlpha=alpha;
      c.strokeStyle=ring.color;
      c.lineWidth=ring.hit?5:2;
      c.beginPath();c.arc(ring.x,ring.y,ring.radius,0,Math.PI*2);c.stroke();
      if(ring.hit){
        c.globalAlpha=alpha*.32;
        c.fillStyle=ring.color;
        c.beginPath();c.arc(ring.x,ring.y,ring.radius*.55,0,Math.PI*2);c.fill();
      }
    }

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
    this.drawEffectStatus(c);
  }

  drawStreetItem(item) {
    const c=this.ctx;
    const labels={cheese:"🧀",coffee:"☕",pedestrian:"🚶",dog:"🐕"};
    const glow=item.kind==="power"?"#ffe46c":"#ff655d";
    const bob=Math.sin(item.bob)*5;
    c.save();c.translate(item.x,item.y+bob);
    c.shadowColor=glow;c.shadowBlur=18;
    c.fillStyle=item.kind==="power"?"rgba(12,22,30,.86)":"rgba(48,10,12,.82)";
    c.strokeStyle=glow;c.lineWidth=3;
    c.beginPath();c.arc(0,0,item.radius*1.15,0,Math.PI*2);c.fill();c.stroke();
    c.shadowBlur=0;c.textAlign="center";c.textBaseline="middle";
    c.font=`${Math.max(24,item.radius*1.45)}px "Segoe UI Emoji",sans-serif`;
    c.fillText(labels[item.type],0,1);
    c.restore();
  }

  drawEffectStatus(c) {
    const active=[];
    if(this.effects.cheese>0)active.push({icon:"🧀",label:"FREEZE",time:this.effects.cheese,color:"#ffe46c"});
    if(this.effects.coffee>0)active.push({icon:"☕",label:"2× SCORE",time:this.effects.coffee,color:"#dba66f"});
    if(this.mistakes.pedestrian>0)active.push({icon:"🚶",label:"RISK",time:this.mistakes.pedestrian,color:"#ff746c"});
    if(this.mistakes.dog>0)active.push({icon:"🐕",label:"RISK",time:this.mistakes.dog,color:"#ff746c"});
    if(!active.length)return;
    const stacked=this.effects.cheese>0&&this.effects.coffee>0;
    c.save();c.textAlign="center";c.textBaseline="middle";
    const y=104,gap=116,total=active.length*gap-gap;
    active.forEach((effect,index)=>{
      const x=this.width*.5-total*.5+index*gap;
      c.fillStyle="rgba(4,9,18,.84)";c.strokeStyle=effect.color;c.lineWidth=2;
      c.beginPath();c.roundRect(x-52,y-21,104,42,13);c.fill();c.stroke();
      c.font='19px "Segoe UI Emoji",sans-serif';c.fillText(effect.icon,x-37,y);
      c.fillStyle="#fff";c.font="800 10px system-ui";c.fillText(effect.label,x+5,y-6);
      c.fillStyle=effect.color;c.font="900 12px system-ui";c.fillText(`${effect.time.toFixed(1)}s`,x+5,y+8);
    });
    if(stacked){c.fillStyle="#ffe66d";c.font="1000 12px system-ui";c.fillText("RAT TRAP RUSH — 3×",this.width*.5,y+34);}
    c.restore();
  }

  drawRat(r) {
    const c=this.ctx;
    const coat=r.coat||{body:"#655e5b",dark:"#4b4543",belly:"#8a807c",ear:"#d39a95",tail:"#a98077"};
    c.save();c.translate(r.x,r.y);c.rotate(r.turn||0);c.scale(r.dir*(r.sizeWobble||1),r.sizeWobble||1);
    const stride=Math.sin(r.gait),bob=Math.abs(Math.sin(r.gait))*2.2*r.depth;
    c.translate(0,-bob);
    const gold=r.value===50;
    c.fillStyle="rgba(0,0,0,.28)";c.beginPath();c.ellipse(0,r.radius*.68,r.radius*1.1,r.radius*.25,0,0,Math.PI*2);c.fill();

    // Tail.
    c.strokeStyle=gold?"#eac953":coat.tail;c.lineWidth=Math.max(1.5,r.radius*.11);c.lineCap="round";
    c.beginPath();c.moveTo(-r.radius*.8,2);c.quadraticCurveTo(-r.radius*1.65,-r.radius*.6,-r.radius*1.9,r.radius*.3);c.stroke();

    // Back legs visibly cycle.
    c.strokeStyle=gold?"#d7ae31":coat.dark;c.lineWidth=Math.max(2,r.radius*.18);
    c.beginPath();
    c.moveTo(-r.radius*.25,r.radius*.35);c.lineTo(-r.radius*.55+stride*r.radius*.35,r.radius*.85);
    c.moveTo(r.radius*.25,r.radius*.35);c.lineTo(r.radius*.55-stride*r.radius*.35,r.radius*.85);
    c.stroke();

    // Body/head.
    if(gold){c.shadowColor="#ffe66d";c.shadowBlur=22}
    c.fillStyle=gold?"#f0c62f":coat.body;
    c.beginPath();c.ellipse(0,0,r.radius*1.02,r.radius*.66,-.04,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(r.radius*.72,-r.radius*.15 + Math.sin(r.look)*r.radius*.035,r.radius*.55,r.radius*.47,0,0,Math.PI*2);c.fill();

    // Belly light and moving forepaws make the tiny silhouette read on phones.
    c.fillStyle=gold?"rgba(255,240,145,.55)":coat.belly;
    c.globalAlpha=.45;
    c.beginPath();c.ellipse(r.radius*.05,r.radius*.12,r.radius*.62,r.radius*.30,0,0,Math.PI*2);c.fill();
    c.globalAlpha=1;
    c.strokeStyle=gold?"#d7ae31":coat.dark;c.lineWidth=Math.max(1.5,r.radius*.13);
    c.beginPath();
    c.moveTo(r.radius*.48,r.radius*.22);c.lineTo(r.radius*.75+stride*r.radius*.16,r.radius*.62);
    c.moveTo(r.radius*.18,r.radius*.26);c.lineTo(r.radius*.38-stride*r.radius*.16,r.radius*.67);c.stroke();

    // Ear, eye, nose.
    c.fillStyle=gold?"#f6dc77":coat.ear;
    c.beginPath();c.arc(r.radius*.42,-r.radius*.48,r.radius*.17,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(r.radius*.68,-r.radius*.48,r.radius*.19,0,Math.PI*2);c.fill();
    c.fillStyle=gold?"#f0c62f":coat.body;
    c.beginPath();c.arc(r.radius*.68,-r.radius*.48,r.radius*.11,0,Math.PI*2);c.fill();
    c.fillStyle="#101010";c.beginPath();c.arc(r.radius*.92,-r.radius*.22,Math.max(1.5,r.radius*.1),0,Math.PI*2);c.fill();
    c.fillStyle="#db9b97";c.beginPath();c.arc(r.radius*1.23,-r.radius*.08,Math.max(1.5,r.radius*.1),0,Math.PI*2);c.fill();

    // Tiny fur highlight keeps darker coats visible against the asphalt.
    c.strokeStyle=gold?"rgba(255,249,185,.8)":"rgba(255,255,255,.20)";
    c.lineWidth=Math.max(1,r.radius*.055);
    c.beginPath();c.moveTo(-r.radius*.42,-r.radius*.29);c.quadraticCurveTo(0,-r.radius*.52,r.radius*.45,-r.radius*.36);c.stroke();

    // Whiskers.
    c.strokeStyle="rgba(245,235,220,.7)";c.lineWidth=1;
    c.beginPath();c.moveTo(r.radius*1.1,-2);c.lineTo(r.radius*1.6,-r.radius*.25);
    c.moveTo(r.radius*1.1,1);c.lineTo(r.radius*1.65,r.radius*.12);c.stroke();

    if(gold){
      c.fillStyle="#fff3a6";c.font=`900 ${Math.max(10,r.radius*.7)}px system-ui`;c.fillText("★",-3,-r.radius*.75);
    }
    c.shadowBlur=0;
    c.restore();
  }
}
