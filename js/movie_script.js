const data = new Data();
// alert('Greetings Madam '+ emo+ '! I hereby declare that the work before you is authentic and not copied from other sources.');

// Adding event selector for dropdown for each show
const wit = new Elements('#mov0');
const bb = new Elements('#mov1');
const got = new Elements('#mov2');

const mov = [wit, bb, got]; 

// To show time watched
const Times = new Time();


// Season drop
function onClick(event){
    const season = event.currentTarget;
    const show_no = parseInt(season.id[3],10);
    const k = parseInt(season.value.split(' ')[1],10);
    const show_name = '#showname-'+show_no;
    const show_detail = '#showdetail-'+show_no;
    const div_seas_name = document.querySelector(show_name);
    const div_seas_detail = document.querySelector(show_detail);
    if (season.value === 'Season 0'){
          div_seas_detail.innerHTML='';
          div_seas_name.innerHTML='';
    }
    else { 
            div_seas_detail.innerHTML='';
            div_seas_name.innerHTML='';
            mov[show_no].drop_epi(div_seas_name,div_seas_detail,k);
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
    var flag = 0;
    index=[];
    console.log();

    const indi = document.querySelectorAll(indiclass);
    if(marc_check.src.split('/')[marc_check.src.split('/').length - 1] == 'eye-gray.png'){
        for (let i of indi){
            i.checked = true;
        }
        marc_check.src = 'images/eye-green.png';
        Times.time_checked.push([sh,se,-1]);
        for(let j=0;j<data.data[sh].seasons[se-1].length;j++){
            flag = 0;
            for(let ele of Times.time_checked){
                if(ele[0]==sh & ele[1]==se & ele[2]==j){flag = 1;break;}    
            }
            if(flag == 0){
                Times.time_checked.push([sh,se,j]);
                Times.changeTime(sh,se,j,+1);
            }
        }
        console.log(Times.time_checked);
    }
    else{
        for(let i of indi){
            i.checked = false;
        }
        marc_check.src = 'images/eye-gray.png';
        for(let ele of Times.time_checked){
            for(let k=0; k<data.data[sh].seasons[se-1].length;k++){
                if(ele[0]==sh & ele[1]==se & ele[2]==k){
                    index.push([sh,se,k]);
                    console.log('index is accessed');
                    Times.changeTime(sh,se,k,-1);       
                }  
        }
    }    
        Times.time_checked = Times.time_checked.filter(item => {
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
        Times.changeTime(sh,se,ep,1);
        Times.time_checked.push([sh,se,ep]);
    }
    else{
        Times.changeTime(sh,se,ep,-1);  
        Times.time_checked = Times.time_checked.filter(item => {
                if(sh == item[0] & se == item[1] & ep == item[2]){return false;}            
                return true;
            }); 
    }
    console.log(Times.time_checked);
}


