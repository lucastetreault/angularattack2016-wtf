import { Injectable } from '@angular/core';

@Injectable()
export class WtfImagesService {

  images = [
    'http://s2.quickmeme.com/img/d0/d0374478557798edfc964afd006512de457207f70346d8e2ef524a98afd73578.jpg',
    'http://www.relatably.com/m/img/wtf-memes/a32c608af64ab319962bda9f20bd6eb52f8d5ee7a45020d56c7b57f591537bb3.jpg', 
    'https://pbs.twimg.com/profile_images/518824259171667969/Vjsn5QuX_400x400.jpeg',
    'http://i0.kym-cdn.com/photos/images/original/000/216/924/4uw5.jpg',
    'http://www.inflexwetrust.com/wp-content/uploads/2015/04/ifwt_wtf.jpg',
    'http://www.relatably.com/m/img/wtf-memes/are-you-serious-wtf-meme-baby-face.jpg',
    'https://www.askideas.com/media/30/Weird-Face-Man-Funny-Wtf-Image.jpg',
    'http://www.evilenglish.net/wp-content/uploads/2014/05/305908d1359615600-madejski-miracle-wtf-shit_640_417_s_c1_center_top_0_0.jpg',
    'https://media.giphy.com/media/GkxMdniUq2n0k/giphy.gif',
    'http://www.veritenews.com/common/images/articles/2015-10-06/cover_1444139326.jpg',
    'http://www.rhaein.com/funnystuff/gifs/wtf/wtf4.gif',
    'http://www.relatably.com/m/img/wtf-memes/5f6fb8fc067c63222679465bd41045a5d86cf4006f0fd3f3929782f51ebc7bde.jpg',
    'http://i0.kym-cdn.com/photos/images/original/000/216/941/wtf-is-this-status.jpg',
    'https://i.imgflip.com/8vwya.jpg',
    'http://thesource.com/wp-content/uploads/2015/02/dude_wtf.png',
    'http://www.reactiongifs.com/wp-content/gallery/wtf/wedding-crashers-wtf.gif',
    'http://www.reactiongifs.com/wp-content/gallery/wtf/what-in-the.gif',
    'http://gif-finder.com/wp-content/uploads/2015/09/Charlie-Day-WTF.gif',
    'https://i.ytimg.com/vi/gAEJtk5LypE/hqdefault.jpg',
    'https://media4.giphy.com/media/jwKE2r7zbiL9m/200_s.gif',
    'http://2.bp.blogspot.com/-hVIejf6KGJU/Udsk1FuH-eI/AAAAAAAARZc/TxUf37m89EU/s1600/wtf6.gif',
    'https://i.ytimg.com/vi/1Dx3dMekIds/maxresdefault.jpg',
    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcThaLOjhXJ_lY_4jATh90u3aGXbwt5t1y_pHGsYLLijpNuX2fTddg',
    'http://www.journaldugeek.com/wp-content/blogs.dir/1/files/2015/12/wtf.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBPHoaWOvWl2ZhrKv3rXKOgRfeZXVARzZN6m7PzEH_GREMqElBA',
    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSFT5viNTYLay-y4ndiMFYV4gjMeFRxRFDR-mEfdzGoJn9R7kIuw',
    'http://i3.kym-cdn.com/entries/icons/original/000/005/954/wtf_is_this_shit2_RE_73_Million_Sharks_Killed_Every_Year-s468x349-71815.jpg',
    'https://media.giphy.com/media/FRRK3vMJ4no52/giphy.gif', 
    'https://upload.wikimedia.org/wikipedia/en/8/8f/WTF_with_Marc_Maron.png',
    'http://weknowmemes.com/wp-content/uploads/2012/05/wtf-is-this.jpg',
    'http://ci.memecdn.com/93/819093.jpg',
    'https://media.giphy.com/media/t67DrVIzQfQhG/giphy.gif',
    'http://gifsec.com/wp-content/uploads/GIF/2014/06/WTF-reaction-gifs.gif?gs=a',
    'http://www.writingwinters.com/wp-content/uploads/wtfgrandma.jpg',
    'http://www.relatably.com/m/img/wtf-memes-facebook/wtf-girl-meme.jpeg'
  ];

  constructor() {}

  getRandom(){
    return this.images[Math.floor(Math.random() * this.images.length)]
  }
}
