// Store all the AR hotspot data here (title, text, image path)
const infoBoxes = [
  {
    title: "Dual Charging Nodes",
    text: "The two metallic nodes on top of each Lumi Bud connect directly to the case for fast, secure charging.",
    image: "images/charging_nodes.png"
  },
  
  {
    title: "Floral Accent Design",
    text: "A decorative flower detail adds a dreamy Y2K touch without losing comfort.",
    image: "images/floral_detail.png"
  },

  {
    title: "Metallic Casing",
    text: "Each Lumi Bud features a sleek metallic outer casing that protects the internal components while giving it a premium reflective finish.",
    image: "images/Metallic_Casing.png"
  },

  {
    title: "Comfort-Fit Silicone Tip",
    text: "Rounded silicone tips stay comfy for long listening sessions.",
    image: "images/Comfort_tip.png"
  },

];


// AR Hotspots – In Desktop View
(() => {
  // we can select all the hotspot buttons inside the model-viewer
  const hotspots = document.querySelectorAll(".Hotspot");

  // this will loop through the infoBoxes array and build the content for each hotspot annotation
  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);
      console.log(selected);

      if (!selected) { return; }

      // we create an h2 for the hotspot title
      const titleElement = document.createElement(`h2`);
      titleElement.textContent = infoBox.title;

      // we create a p tag for the hotspot description text
      const textElement = document.createElement(`p`);
      textElement.textContent = infoBox.text;

      // we create an img tag for the hotspot image
      const imageElement = document.createElement(`img`);
      imageElement.src = infoBox.image;
      imageElement.alt = infoBox.title;

      // we add the image first
      selected.appendChild(imageElement);

      // then we add the title
      selected.appendChild(titleElement);

      // then we add the description text
      selected.appendChild(textElement);
    }); 
  }

  // Added a small bounce animation when the hotspot is clicked (this is only for desktop)
  function animateHotspotClick() {
    // This click animation can only run on desktop screen sizes
    if (!window.matchMedia("(min-width: 768px)").matches) { return; }

    let selected = document.querySelector(`#${this.slot}`);

    gsap.fromTo(
      selected,
      { scale: 1 },
      {
        duration: 0.3,
        scale: 1.1,
        yoyo: true,
        repeat: 1,
        transformOrigin: "center center"
      }
    );
  }

  // we build the initial hotspot content when the page loads
  loadInfo();

  // Shows the hotspot annotation when the user hovers over a hotspot
  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  // Hides the hotspot annotation when the mouse leaves
  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }
  
  // Attaches all the events to each hotspot (hover and click)
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
    hotspot.addEventListener("click", animateHotspotClick);
  });

})();


// Mobile AR Viewer – shows info in boxes under the model on Mobile Version
(() => {

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {

      // Grabbing the desktop hotspot annotation
      const selected = document.querySelector(`#hotspot-${index + 1}`);
      // Grabbing the matching mobile underneath the model-viewer
      const mobileSelected = document.querySelector(`#hotspot-mobile-${index + 1}`);

      if (!selected || !mobileSelected) {
        return;
      }

      // clear any existing content first
      selected.innerHTML = "";
      mobileSelected.innerHTML = "";

      // we create new elements for this info box
      const titleElement = document.createElement("h2");
      titleElement.textContent = infoBox.title;

      const textElement = document.createElement("p");
      textElement.textContent = infoBox.text;

      const imgElement = document.createElement("img");
      imgElement.src = infoBox.image;
      imgElement.alt = infoBox.title;

      // Desktop, placing the info inside the hotspot annotation
      if (window.matchMedia("(min-width: 768px)").matches) {
        selected.appendChild(imgElement.cloneNode(true));
        selected.appendChild(titleElement.cloneNode(true));
        selected.appendChild(textElement.cloneNode(true));
      } 
      // Mobile, placing the info into the boxes under the model-viewer
      else {
        mobileSelected.appendChild(imgElement.cloneNode(true));
        mobileSelected.appendChild(titleElement.cloneNode(true));
        mobileSelected.appendChild(textElement.cloneNode(true));
      }
    });
  }

  // Listen for window resize and it reloads the layout when the screen size changes
  window.addEventListener("resize", loadInfo);
  // we also run it once when the page loads
  loadInfo();

})();


// Scroll Trigger – navigation smooth scroll + box animation
(() => {

    // we register the ScrollTrigger and ScrollTo plugins with GSAP
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // Grabbing all the header nav links
    const navLinks = document.querySelectorAll("#main-header nav ul li a");

    // When the nav link is clicked, it will smoothly scroll to the target section
    function scrollLink(e) {    
        e.preventDefault(); 
        console.log(e.currentTarget.hash);
        let selectedLink = e.currentTarget.hash;
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: `${selectedLink}`, offsetY: 100 }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

    gsap.to("#box3", {
        duration: .5,
        scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=400", 
          markers: true
        },
        x: 500,
        ease: "bounce.out",
    });

})();


// Comparison Slider (Xray) 
(() => {

    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");

    // when the slider moves, we update the divisor width
    function moveDivisor() {
        divisor.style.width = `${slider.value}%`;
    }

    // when the page loads, it starts in the middle at 50
    function resetSlider() {
        slider.value = 50;
        divisor.style.width = "50%"; 
    }

    // Listens for slider input and for initial page to load
    slider.addEventListener("input", moveDivisor);
    window.addEventListener("load", resetSlider);

})();


// Webp Animation 
(() => {
    console.log("IIFE Called");

    // Grab the canvas and its 2D drawing context
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

    // Setting the canvas dimensions to match the frame size
    canvas.width = 1920;
    canvas.height = 1080;

    // Defining the total number of frames in the image sequence
    const frameCount = 240;

    // we use this array to store all the preloaded images
    const images = [];

    // this object holds the current frame index that GSAP will update
    const buds = {
        frame: 0
    };

    // it preloads every image into the images array using the correct filename pattern
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `images/Earbuds_LumiBuds_${i.toString().padStart(5, "0")}.webp`;
        images.push(img);
    }
    
    gsap.to(buds, {
      frame: frameCount - 1,  // it should end on the last frame (239)
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          start: "top top",
          markers: true
      },
      onUpdate: render
    });

    // once the first image is loaded, it will draw the initial frame
    images[0].addEventListener("load", render);

    // on each update, it clears the canvas and draws the current frame
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }

})();
