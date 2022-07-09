// contentful API
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "9jymvtcxwh93",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "Jy0hf95do-oC9qE2Qf9AXzD9U5gmikd3jr2eQmB12KE",
});

async function getContentful_portofolio() {
  try {
    const resPortofolio = await client.getEntries({
      content_type: "isometric",
    });

    let portofolio = resPortofolio.items;

    // destructuring opj portofolio
    portofolio = portofolio.map((item) => {
      let { description, type } = item.fields;
      let img = item.fields.img.fields.file.url;
      return { description, type, img };
    });
    return portofolio;
  } catch (error) {
    console.log(error);
  }
}
async function getContentful_test() {
  try {
    const resTest = await client.getEntries({
      content_type: "testimonials",
    });

    let test = resTest.items;

    // destructuring opj test
    test = test.map((item) => {
      let { opinions, name } = item.fields;
      let img = item.fields.img.fields.file.url;
      return { opinions, name, img };
    });
    return test;
  } catch (error) {
    console.log(error);
  }
}

const portofolio_box = document.querySelector(".portofolio-img-box");
getContentful_portofolio().then((portofolio) => {
  let result = "";
  portofolio.forEach((item) => {
    result += `
    <div class="portofolio-img all ${item.type}">
    <img
      src="${item.img}"
      alt="${item.type}"
    />
    <div class="portofolio-txt flex">
      <h4>${item.type}</h4>
      <p>${item.description}</p>
    </div>
  </div>
    `;
  });
  portofolio_box.innerHTML = result;
});

const testimonials_box = document.querySelector(".testimonials-box");
getContentful_test().then((test) => {
  let result = "";
  test.forEach((item) => {
    result += `
    <div class="testimonials-item light-border bg-gradient-164">
    <blockquote>
      <p>
       ${item.opinions}
      </p>
    </blockquote>
    <div class="testimonials-img">
      <img src="${item.img}" alt="" />
    </div>
    <div class="testimonials-info flex">
      <h4>${item.name}</h4>
      <div class="testimonials-link">
        <a href="#"
          ><i class="fab fa-facebook-square"></i>
        </a>
        <a href="#"
          ><i class="fab fa-behance-square"></i
        ></a>
        <a href="#"
          ><i class="fab fa-instagram-square"></i
        ></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  </div>
  `;
  });
  testimonials_box.innerHTML = result;

  //Testimonials
  let next_testimonial = document.querySelector(".testimonials .carousel-left"),
    prev_testimonial = document.querySelector(".testimonials .carousel-right"),
    testimonialsBox = document.querySelector(".testimonials-box");

  const carouseloT = new Carousel(
    next_testimonial,
    prev_testimonial,
    testimonialsBox
  );
});

// carouselo
import { Carousel } from "./Carousel.js";

//navigation box
const nav = document.querySelectorAll(".nav .box "),
  box = document.querySelector(".secction .box"),
  boxItem = document.querySelectorAll(".secction .box .box__face");

let curent = "";

function changeSide() {
  nav.forEach((nav) => {
    boxItem[1].style.display = "none";
    boxItem[2].style.display = "none";
    boxItem[3].style.display = "none";
    boxItem[4].style.display = "none";
    nav.addEventListener("click", (e) => {
      boxItem.forEach((bx) => (bx.style.display = "block"));
      if (curent) {
        box.classList.remove(curent);
      }
      curent = `move-${nav.dataset.dir}`;
      box.classList.add(curent);
      hideBx();
    });
  });
}
function hideBx() {
  let newBox = Array.from(boxItem).filter(
    (bx) => !bx.classList.contains(curent)
  );
  setTimeout(() => {
    newBox.forEach((bx) => {
      bx.style.display = "none";
    });
  }, 800);
}

changeSide();

nav.forEach((navBox) => {
  navBox.addEventListener("click", (e) => {
    nav.forEach((navBox) => {
      navBox.classList.remove("active");
    });
    navBox.classList.add("active");
  });
});
// portofolio nav
let cat_btn = document.querySelectorAll(".cat li a");

cat_btn.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    cat_btn.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

cat_btn.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.querySelectorAll(".portofolio-img").forEach((ele) => {
      ele.classList.add("hide");

      setTimeout(() => {
        ele.style.display = "none";
      }, 500);
    });
    document.querySelectorAll(ele.dataset.cat).forEach((ele) => {
      setTimeout(() => {
        ele.classList.remove("hide");
        ele.style.display = "block";
      }, 500);
    });
  });
});

//Client slider

let next_Client = document.querySelector(".our-partner .carousel-left"),
  prev_Client = document.querySelector(".our-partner .carousel-right"),
  ourPartnerBox = document.querySelector(".our-partner-box");

const carouseloP = new Carousel(next_Client, prev_Client, ourPartnerBox);
