import React from "react";
import classes from "./AboutUs.module.css";

const AboutUsSection = () => {
  return (
    <div className={classes.container}>
      <img src="/eatsyIcons/EatsyAboutUsIcon.jpeg" alt="Eatsy Icon" className={classes.imageIcon} />
      <h3 className={classes.title}>Our Promise...</h3>
      <p className={classes.content}>
        Since our inception, Eatsy food has been feeding people across the nation with value for money, high-quality food since 2010. Our mission is to ensure
        as many people have access to affordable, high quality food without breaking the bank. By leveraging the rise of the internet, we believe having an
        online presence will greatly increase our product presence to the public.
      </p>
      <p className={classes.content}>
        As we believe in offering a diverse range of food, our menu is extremely comprehensive with representation from more than TEN regions around the world.
        We are proud of the quality and authenticity of the dishes we make. We are proud of the diversity of dishes and we hope tasting our food does reminds
        you of home wherever you are. Do keep a look out for our latest offering as we post monthly featured dish and promotion on our homepage carousel.
      </p>
      <img src="/eatsyIcons/EatsyTeam.jpg" alt="EatsyTeam" className={classes.imageTeam} />
      <figcaption className={classes.caption}>Eatsy&apos;s incredible four man band.</figcaption>
      <h3 className={classes.title}>Our Story...</h3>
      <p className={classes.content}>
        Established in 2010, this app was the brain child of the reclusive but brillant individuals, Spongebob and Patrick. The idea of Eatsy was born out of
        frustration during a rainy Sunday evening. When both individual decided to order take out and both were craving for some south American food. However
        they soon realize that there were no such options available around where they were living.
      </p>
      <p className={classes.content}>
        Undeterred, they searched even further out (300 miles radius to be precise) but to their surprise, there was not a single food delivery place that
        offers a South American option. With frustration, they concluded that this is unacceptable and decided to do something about it. And something about it
        they did! After twelve months of countless sleepless nights, Eatsy was born!
      </p>
      <p className={classes.content}>
        In the mid of 2015, the Eatsy family further expanded with the inclusion of two important members. Firstly, Mr Krabs, an establish legend in the
        industry joined team to support communications and marketing. Rounding up the four member team is Squidward. The team has been leveraging
        Squidward&apos;s decades of experience in customer service/support to maintain Eatsy&apos;s high customer satisfaction. On a side note, the food app
        &quot;Eatsi&quot; has no affiliation to Eatsy. Eatsi app was founded by our competitor/arch nemesis/mortal enemy &quot;Plankton&quot;.
      </p>
    </div>
  );
};

export default AboutUsSection;
