function loader__(x){
    if(x){
        var div = document.createElement("div");
        div.style = `
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            width: 100vw;
            height: 100vh;
            position: fixed;
            inset: 0;
        `;
        div.id = "loader";

        document.body.style.overflow = "hidden";

        var img = document.createElement("img");
        img.src = x;
        img.style.width = "30rem";
        div.appendChild(img);
        document.body.append(div);
    } else {
        document.body.style.overflow = "scroll";
        document.querySelector("#loader").style.display = "none";
        const grid = document.querySelector('.grid-container');
                    new Masonry(grid, {
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-item',
                        percentPosition: true,
                        gutter: 10
                    });
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    loader__("/images/logo.jpg");
})

function settings__(x){
    var sty = document.createElement("style");
    sty.innerHTML = `
        :root{
            --color: ${x.color};
            --bg: ${x.background};
        }
        a:hover {
            color: ${x.hover} !important;
        }
    `;
    document.head.appendChild(sty);
}

function navigation__(x){
    if(document.querySelector(".navbar")){
        document.querySelector(".navbar a").innerHTML = x.name;

        document.querySelector(".nav-links").innerHTML = "";
        x.links.forEach(e => {
            var a = document.createElement("a");
            var l = document.createElement("li");
            a.href = e[1];
            a.innerHTML = e[0];
            l.appendChild(a);
            document.querySelector(".nav-links").appendChild(l);
        });
    }
}

function hero__(x){
    if(document.getElementById("hero")){
        document.getElementById("hero").querySelector("img").src = x.image;
        document.getElementById("hero").querySelector("h2").innerHTML = x.heading;
        document.getElementById("hero").querySelector("p").innerHTML = x.paragraph;
    }
}

/*
<div onclick="openModal(this)" class="grid-item">
            <img src="https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Image 1">
            <p class="img-description d-none">Description for image 2</p>
        </div>
 */

function gallery__(x){
    if(document.querySelector(".grid-container")){
        if(document.querySelector(".grid-container").previousElementSibling){
            document.querySelector(".grid-container").previousElementSibling.children[0].innerHTML = x.heading;
        } 
        document.querySelector(".grid-container").innerHTML = "";
        x.images.forEach((e,i)=>{
            var div = document.createElement("div");
            
            div.classList.add("grid-item");
            
            var img = document.createElement("img");
            img.src = e[0];

            var p = document.createElement("p");
            p.classList.add("img-description", "d-none");

            div.append(img, p);

            div.addEventListener("click", ()=>{
                openModal(div)
            });
            document.querySelector(".grid-container").append(div);
            
        })
    }
}

function contact__(x){
    if(document.querySelector("form")){
        document.querySelector("form").action = "https://formsubmit.co/"+x.email;
    }
}

function footer__(x, y){
    if(document.querySelector("footer")){
        // copyright
        document.querySelector("footer").innerHTML = "";
        var p1 = document.createElement("p");
        p1.innerHTML = x.copyright + y.name;
        p1.style.textAlign = "center";

        var p2 = document.createElement("p");
        p2.innerHTML = "Powered by";
        var a = document.createElement("a");
        a.href = x.powered[1];
        a.innerHTML = x.powered[0];
        p2.style.textAlign = "center";
        p2.style.fontSize = ".7rem"
        p2.appendChild(a);

        document.querySelector("footer").append(p1, p2);

        // socails
        document.querySelector("footer").previousElementSibling.innerHTML = "";
        x.socials.forEach(e=>{
            var sa = document.createElement("a");
            sa.style="text-decoration: none;color: black;text-align: center;margin: 0 1rem;";
            var simg = document.createElement("img");
            simg.src = "/svg/"+e[0]+".svg";
            if(e[0]!= "email" && e[0] != "phone"){
                sa.href = e[1];
            } else if(e[0] == "email"){
                sa.href = "mailto:"+e[1];
            } else if(e[0] == "phone"){
                sa.href = "tel:"+e[1];
            }
            sa.appendChild(simg);
            sa.innerHTML += " "+ e[0];
            document.querySelector("footer").previousElementSibling.append(sa);
        })
    }
}

fetch("/index.json")
.then(res=>res.json())
.then(data => {
    settings__(data.settings);
    navigation__(data.layout.navigation)
    hero__(data.layout.hero)
    gallery__(data.layout.gallery)
    contact__(data.layout.contact)
    footer__(data.layout.footer, data.layout.navigation)

    setTimeout(() => {
        loader__(false);
    }, 2000);
})