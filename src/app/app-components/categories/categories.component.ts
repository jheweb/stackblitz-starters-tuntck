import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

interface categoryData {
  category: string; 
  names: string[]; 
} 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})



export class CategoriesComponent implements OnInit {
  changeShow: boolean[] = [];
  changeColor: boolean[] = [];
  selected:boolean = false;
  searchWord : string = "";
    lib = {
    categories: [
    'Performance', 'Investments', 'Operations'
    ],
    applets: [
    {
    name: 'Performance Snapshot',
    categories: ['Performance']
    },
    {
    name: 'Commitment Widget',
    categories: ['Investments']
    },
    {
    name: 'CMS',
    categories: ['Investments', 'Performance' ]
    }
    ]
    };

    lib2 = {
      categories: [
      'Performance', 'Investments', 'Operations'
      ],
      applets: [
      {
      name: 'Performance Snapshot',
      categories: ['Performance']
      },
      {
      name: 'Commitment Widget',
      categories: ['Investments']
      },
      {
      name: 'CMS',
      categories: ['Investments', 'Performance' ]
      }
      ]
      };
 


  categories  : categoryData[] = []


   applets : string[] = []

   constructor(){
 
    //  this.addBigData(this.lib, 100, 5000);
      
   }
  ngOnInit(): void { 
   this.initData();   
  }

  initData(){
    this.lib.categories.forEach((t1,i)=>{ 
      let names = this.lib.applets.filter(t=>t.categories.includes(t1)).map(t=>t.name); 
      
      this.categories.push({category:t1, names:names}); 

    });

    this.categories.forEach((t,i)=>{
      this.changeColor.push(false);
      this.changeShow.push(true);
     });
     this.categories = this.categories.sort((a,b)=>a.category.localeCompare(b.category));

  }
  
  seletCategory(category:string, index:number){
    
    //console.log("selet Category   index",  {category, index});
    //console.log("this.changeColor -----  AA ", this.changeColor);

    //let c1 = [...this.changeColor]

    this.changeColor = this.changeColor.map(t=>t=false);



    this.changeColor[index] = true;
 
  //   setTimeout(() => { 
  //   //  this.changeColor[index] =true;
  //     console.log("this.changeColor -----  CC ",this.changeColor);
  //    }, 100);
     
  //  // 
  //   console.log("this.changeColor -----   B ", this.changeColor);

    let result = this.lib.applets.filter(t=>t.categories.includes(category)).map(t=>t.name);

    this.applets = result;
    //console.log("result   ", result);
  
  
   //  this.lib.applets["category"]
  }

  searchApplets(event: any){
 
    let cats = this.categories.map(t=>t.category);
    if(event.target.value){

      let applet  = event.target.value;
       this.applets= this.lib.applets.filter(t=>t.name.toLowerCase().includes(applet.toLowerCase())).map(t=>t.name);
       let r1 = this.lib.applets.filter(t=>t.name.toLowerCase().includes(applet.toLowerCase())).map(t=>t.categories.concat(t.name));
       
 
      cats.forEach((t1,i)=>{ 
        this.changeShow[i] = false;  
                r1.forEach((t2 )=>{  
                   t2.some((t3)=>{ 
                      
                      if(t3.toLowerCase().includes(t1.toLowerCase()) ){   
                       this.changeShow[i] = true;
                      } 
                   });
                 

                });
         

      });
    }else{

      cats.forEach((t1,i)=>{
        this.changeShow[i] = true;
      });

    }
  }
  addBigData(lib: any, ncategs: number, napplets: number) {
    for (var i = 0; i < ncategs; i++) {
      lib.categories.push('Sample Category ' + i);
    }
    var n = lib.categories.length;
    for (var i = 0; i < napplets; i++) {
      var a : any = {
        name: 'CMS' + i,
        categories: []
      };
      for (var j = 0; j < Math.floor(Math.random() * 10); ++j) {
        var idx = Math.floor(Math.random() * n) % n;
        let a1 = lib.categories[idx];
        a.categories.push(a1);
      }
      lib.applets.push(a);
    }

    //const slicedArray = array.slice(0, n);
    }
}
