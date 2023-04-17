class Elements{
     constructor(id){
          this.drop_div = document.querySelector(id); 
          this.drop_div.addEventListener('click', onClick);
          this.i = id[4];
          this.show = '#show' + this.i;
          this.show_name = 'showname-' + this.i;
          this.show_detail = 'showdetail-' + this.i;
          this.movie = document.querySelector(this.show);
          this.div_sea_name = document.createElement('div');
          this.div_sea_name.style.position = 'relative';
          this.div_sea_detail = document.createElement('div');
          this.div_sea_name.id = this.show_name;
          this.div_sea_detail.id = this.show_detail;
          this.div_sea_detail.classList.add('season-detail');
          this.movie.appendChild(this.div_sea_name);
          this.movie.appendChild(this.div_sea_detail);
          
     } 

     drop_epi(name, det, season_no){
       // Season Name
        const seas = document.createElement('h2');
        const marcar = document.createElement('label');
        const check_eye = document.createElement("img");
        const classid = 'indivtool-'+this.i+'-'+season_no;
        seas.textContent = 'Season ' + season_no;
        check_eye.src = 'images/eye-gray.png'; 
        check_eye.width = '35';
        check_eye.id = "marc-"+this.i+'-'+season_no;
        check_eye.classList.add('eye');
        marcar.style.position = 'absolute';
        marcar.style.top = '33px';
        marcar.innerHTML = 'Marcar todos';
        marcar.style.marginLeft = '17px';
        name.appendChild(seas);
        name.appendChild(check_eye);
        name.appendChild(marcar);

        // Episode Image and Description
        for(let i=0;i<data.data[this.i].seasons[season_no-1].length;i++){
            const epi = document.createElement('div');
            const img = document.createElement('img');
            const tick = document.createElement('img');
            const div_desc = document.createElement('div');
            const desc_title = document.createElement('h3');
            const desc_date = document.createElement('span');
            const desc_pass = document.createElement('p');
     
            img.src= data.data[this.i].seasons[season_no-1][i].image;
            tick.src = 'images/check.png';

            epi.id = classid +'-'+i;
            if (i > 9){
                desc_title.textContent = 'S0' + season_no + 'E' + parseInt(i+1) +': '+ data.data[this.i].seasons[season_no-1][i].name; 
            }
            else{
                 desc_title.textContent = 'S0' + season_no + 'E0' + parseInt(i+1) +': '+ data.data[this.i].seasons[season_no-1][i].name;   
            } 
            var [year,month,date] = data.data[this.i].seasons[season_no-1][i].airdate.split('-');
            desc_date.textContent = date+'/'+month+'/'+year;
            desc_pass.textContent = data.data[this.i].seasons[season_no-1][i].summary;

            det.appendChild(epi);
            epi.appendChild(img);
            epi.appendChild(tick);
            epi.appendChild(div_desc);

            div_desc.appendChild(desc_title);
            div_desc.appendChild(desc_date);
            div_desc.appendChild(desc_pass);

            epi.classList.add(classid, 'episode-detail');
            tick.classList.add('tick');
            div_desc.classList.add('episode-desc');
            img.classList.add('episodeImg');
            desc_title.classList.add('episodeh3', 'small');
            desc_date.classList.add('episodeSpan', 'small');
            desc_pass.classList.add('episodeP','small');
            img.setAttribute('draggable', false);
            div_desc.setAttribute('draggable', false);
            
            // Episode animate
            epi.addEventListener('mousedown', Start);
            epi.addEventListener('mousemove', Move);
            epi.addEventListener('mouseleave', End);
            epi.addEventListener('mouseup', End);
          }  
            //Render checked elements
            for(let ele of Times.time_checked){
                if(ele[0]==this.i & ele[1]==season_no & ele[2]!=-1){
                    const check = document.querySelector('#'+classid+'-'+ele[2]);
                    addBackground(check.firstChild);
                    check.children[1].id = 'checkImg';             
                }
                else if(ele[0]==this.i & ele[1]==season_no & ele[2]==-1){
                    check_eye.src = 'images/eye-green.png';
                }
            }
            // Marcar todo
            check_eye.addEventListener('click', checkMarc);   
     }
}