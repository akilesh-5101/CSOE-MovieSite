var data = JSON.parse(JSON.stringify(TV_SHOWS));
clickW = 0;
clickB = 0;
clickG = 0;

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

// drop_epi()


// To implement marcar tools
w_div = document.querySelector('#showname-0');
w_div.addEventListener('click', checkMarc);

b_div = document.querySelector('#showname-1');
b_div.addEventListener('click', checkMarc);

g_div = document.querySelector('#showname-2');
g_div.addEventListener('click', checkMarc);

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


// To create dropdown for episodes 
function drop_epi(name, det, show, season_no){
// Season Name
        const seas = document.createElement('h2');
        const marcar = document.createElement('label');
        const check_box = document.createElement("input");
        seas.textContent = 'Season ' + season_no;
        check_box.type = "checkbox";
        check_box.id = "todo-"+show;
        marcar.for =  'todo-'+show;
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
            desc_check.classList.add('indivtool');
            desc_check.id = 'indivtool-'+show+'-'+season_no+'-'+i;
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

            // Click marcar checkbox


            // Click an indiv checkbox
            const indiv_check = document.querySelectorAll('.indivtool');
            for(let ele of indiv_check){
                ele.addEventListener('click', onCheckTime);
            }
        }

// Season Description
}

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
    const n = event.currentTarget.id.split('-')[1];
    const indiclass = '.indivtool-'+n;
    const marcid = '#todo-'+n
    const marc_check = document.querySelector(marcid);
    const indi = document.querySelectorAll(indiclass);
    if(marc_check.checked == true){
        for (let i of indi){
            i.checked = true;
        }
    }
    else{
        for (let i of indi){
            i.checked = false;
        }
    }
}
 
function onCheckTime(event){
    const times_check = event.currentTarget;
    const show = times_check.id.split('-')[1];
    const season = times_check.id.split('-')[2];
    const episode = times_check.id.split('-')[3];
    var days = parseInt(time_dhm.textContent.split(' ')[0],10);
    var hours = parseInt(time_dhm.textContent.split(' ')[2],10);
    var minutes = parseInt(time_dhm.textContent.split(' ')[4],10);
    var time = days*1440 + hours*60 + minutes;
    if(times_check.checked == true){
        time = time + data[show].seasons[season-1][episode].runtime;
    }
    else{
        time = time - data[show].seasons[season-1][episode].runtime;
    }

    var [days,hours,minutes] = min_to_dhm(time);
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