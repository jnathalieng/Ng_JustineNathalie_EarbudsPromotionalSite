(() => {
  const hotspots = document.querySelectorAll(".Hotspot");

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

  ]

  //functions

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);
      console.log(selected);

      if (!selected) { return; }

      //lets create an h2
      const titleElement = document.createElement(`h2`);
      titleElement.textContent = infoBox.title;

      //lets create p
      const textElement = document.createElement(`p`);
      textElement.textContent = infoBox.text;

      // image
      const imageElement = document.createElement(`img`);
      imageElement.src = infoBox.image;
      imageElement.alt = infoBox.title;
      selected.appendChild(imageElement);

      // let's add the h2 to the selected hotspot
      selected.appendChild(titleElement);

      // let's add the p to the selected hotspot
      selected.appendChild(textElement);
    }); 
  }

  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }
  
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
