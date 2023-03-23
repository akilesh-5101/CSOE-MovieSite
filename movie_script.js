var data = JSON.parse(JSON.stringify(TV_SHOWS));

var emo = String.fromCodePoint(0x1F604);
alert('Greetings Madam '+ emo+ '! I hereby declare that the work before you is authentic and not copied from other sources.');
// Front END
witcher_ep_drop = document.querySelector('#witcher');
witcher_ep_drop.addEventListener('click', onClick);

breakbad_ep_drop = document.querySelector('#breakbad');
breakbad_ep_drop.addEventListener('click', onClick);

got_ep_drop = document.querySelector('#got');
got_ep_drop.addEventListener('click', onClick);

// Create divs for dropdown
for(let i=0; i<3; i++){
        let show = '#show' + i;
        let show_name = 'showname-' + i;
        let show_detail = 'showdetail-' + i;
        const movie = document.querySelector(show);
        const div_sea_name = document.createElement('div');
        const div_sea_detail = document.createElement('div');
        div_sea_name.id = show_name;
        div_sea_detail.id = show_detail;
        div_sea_detail.classList.add('season-detail');
        movie.appendChild(div_sea_name);
        movie.appendChild(div_sea_detail);
    }


// To implement marcar tools
// w_div = document.querySelector('#showname-0');
// w_div.addEventListener('click', checkMarc);

// b_div = document.querySelector('#showname-1');
// b_div.addEventListener('click', checkMarc);

// g_div = document.querySelector('#showname-2');
// g_div.addEventListener('click', checkMarc);

// To show time watched
const head_time = document.querySelector('.container');
const time_div = document.createElement('div');
const time_head = document.createElement('h1');
const time_dhm = document.createElement('h1');
time_div.classList.add('time-div');
time_head.classList.add('time-head', 'time');
time_head.textContent = 'Total Time Spent';
time_dhm.classList.add('time-dhm', 'time');
time_dhm.textContent = '0 days, 0 hours, 0 minutes';
head_time.appendChild(time_div);
time_div.appendChild(time_head);
time_div.appendChild(time_dhm);



// BACKEND
clickW = 0;
clickB = 0;
clickG = 0;
time_checked = [];

// To create dropdown for episodes 
function drop_epi(name, det, show, season_no){
// Season Name
        const seas = document.createElement('h2');
        const marcar = document.createElement('label');
        const check_box = document.createElement("input");
        const classid = 'indivtool-'+show+'-'+season_no;
        seas.textContent = 'Season ' + season_no;
        check_box.type = "checkbox";
        check_box.id = "marc-"+show+'-'+season_no;
        marcar.innerHTML = 'Marcar todos';
        marcar.style.fontSize = 18;
        name.appendChild(seas);
        name.appendChild(check_box);
        name.appendChild(marcar);

        // Episode Image and Description
        for(let i=0;i<data[show].seasons[season_no-1].length;i++){
            const epi = document.createElement('div');
            const img = document.createElement('img');
            const div_desc = document.createElement('div');
            const desc_check = document.createElement('input');
            const desc_title = document.createElement('h3');
            const desc_date = document.createElement('span');
            const desc_pass = document.createElement('p');
            img.src= data[show].seasons[season_no-1][i].image;
            desc_check.type = 'checkbox';
            desc_check.classList.add(classid);
            desc_check.id = classid +'-'+i;
            if (i > 9){
                desc_title.textContent = 'S0' + season_no + 'E' + parseInt(i+1) +': '+ data[show].seasons[season_no-1][i].name; 
            }
            else{
                 desc_title.textContent = 'S0' + season_no + 'E0' + parseInt(i+1) +': '+ data[show].seasons[season_no-1][i].name;   
            } 
            var [year,month,date] = data[show].seasons[season_no-1][i].airdate.split('-');
            desc_date.textContent = date+'/'+month+'/'+year;
            desc_pass.textContent = data[show].seasons[season_no-1][i].summary;

            det.appendChild(epi);
            epi.appendChild(img);
            epi.appendChild(div_desc);
            div_desc.appendChild(desc_check);
            div_desc.appendChild(desc_title);
            div_desc.appendChild(desc_date);
            div_desc.appendChild(desc_pass);

            epi.classList.add('episode-detail');
            div_desc.classList.add('episode-desc');
            img.classList.add('episodeImg');
            desc_title.classList.add('episodeh3', 'small');
            desc_date.classList.add('episodeSpan', 'small');
            desc_pass.classList.add('episodeP','small');
            
            // Indiv check
            desc_check.addEventListener('click', onSetTime);
            }
            //Render checked elements
            for(let ele of time_checked){
                if(ele[0]==show & ele[1]==season_no & ele[2]!=-1){
                    const check = document.querySelector('#'+classid+'-'+ele[2]);
                    check.checked = true;              
                }
                else if(ele[0]==show & ele[1]==season_no & ele[2]==-1){
                    check_box.checked = true;
                }
            }
            // Marcar todo
            check_box.addEventListener('click', checkMarc);
}

// Season drop
function onClick(event){
    const season = event.currentTarget;
    if (season.id === 'witcher'){
        show_no = 0;
    }
    else if (season.id === 'breakbad'){
        show_no = 1;
    }
    else if (season.id === 'got'){
        show_no = 2;
    }
    const k = parseInt(season.value.split(' ')[1],10);
    const show_name = '#showname-'+show_no;
    const show_detail = '#showdetail-'+show_no;
    const div_seas_name = document.querySelector(show_name);
    const div_seas_detail = document.querySelector(show_detail);
    if (season.value === 'Season 0'){
          div_seas_detail.innerHTML='';
          div_seas_name.innerHTML='';
          switch(show_no){
            case 0: clickW = 0;break;
            case 1: clickB = 0;break;
            case 2: clickG = 0;
          }
    }
    else if((clickW === 0 | clickB === 0 | clickG === 0)){ 
            div_seas_detail.innerHTML='';
            div_seas_name.innerHTML='';
            drop_epi(div_seas_name,div_seas_detail,show_no,k);
            switch(show_no){
                case 0: clickW = 1;;break;
                case 1: clickB = 1;break;
                case 2: clickG = 1;
          }
    }
}

function checkMarc(event){
    const marc_check = event.currentTarget;
    
    const m = marc_check.id.split('-')[1];
    const n = marc_check.id.split('-')[2];
    const indiclass = '.indivtool-'+m+'-'+n;
    const marcid = '#marc-'+m+'-'+n;
    const sh = parseInt(m,10);
    const se = parseInt(n,10);
    var index = [1,2,3,4];
    index=[];

    const indi = document.querySelectorAll(indiclass);
    if(marc_check.checked == true){
        for (let i of indi){
            i.checked = true;
        }
        time_checked.push([sh,se,-1]);
        for(let j=0;j<data[sh].seasons[se-1].length;j++){
            if(time_checked.includes([sh,se,j])==false){
                time_checked.push([sh,se,j]);
                changeTime(sh,se,j,+1);
            }
        }
        console.log(time_checked);
    }
    else{
        for(let i of indi){
            i.checked = false;
        }
        for(let ele of time_checked){
            for(let k=0; k<data[sh].seasons[se-1].length;k++){
                if(ele[0]==sh & ele[1]==se & ele[2]==k){
                    index.push([sh,se,k]);
                    console.log('index is accessed');
                    changeTime(sh,se,k,-1);       
                }  
        }
    }    
        time_checked = time_checked.filter(item => {
                for(let g of index){
                    if(g[0] == item[0] & g[1] == item[1] & g[2] == item[2]){return false;}
                    else if(sh == item[0] & se == item[1] & item[2] == -1){return false;}            
                }
                return true;
            });    
    }

}


function onSetTime(event){
    const indiv = event.currentTarget;
    const m = indiv.id.split('-')[1];
    const n = indiv.id.split('-')[2];
    const p = indiv.id.split('-')[3];
    const sh = parseInt(m,10);
    const se = parseInt(n,10);
    const ep = parseInt(p,10);
    if(indiv.checked == true){
        changeTime(sh,se,ep,1);
        time_checked.push([sh,se,ep]);
    }
    else{
        changeTime(sh,se,ep,-1);  
        time_checked = time_checked.filter(item => {
                if(sh == item[0] & se == item[1] & ep == item[2]){return false;}            
                return true;
            }); 
    }
}

function changeTime(show,season,episode,c){
    var days = parseInt(time_dhm.textContent.split(' ')[0],10);
    var hours = parseInt(time_dhm.textContent.split(' ')[2],10);
    var minutes = parseInt(time_dhm.textContent.split(' ')[4],10);
    var time = days*1440 + hours*60 + minutes;
    
    time = time + c*data[show].seasons[season-1][episode].runtime;

    [days,hours,minutes] = min_to_dhm(time);
    time_dhm.textContent = ''+days+' days, '+hours+' hours, '+minutes+' minutes';
}

function min_to_dhm(time){
    const d = Math.floor(time/1440);
    time = time % 1440;
    const h = Math.floor(time/60);
    time = time % 60;
    const m = time;
    return [d,h,m];
}