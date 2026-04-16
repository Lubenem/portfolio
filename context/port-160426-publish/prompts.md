##

* [sites](~/projects/portfolio/sites)
- those are template example site for different business niches (dentist, plumber, etc) 
- I will show those to some people (leads) and I will propose them to do a similar site but specifically for them

I have just copied my whole portfolio of sites from my replit account
My plan is to instead of hosting them all separately in replit and paying money for that 
I will create one project (repo), call it `portfolio` and host it on github for free

[portfolio](~/projects/portfolio/sites/portfolio)
 - this site will be the main one, it contain my picture and some info about me.
 - I think in the future we will add a nice section with links to each of the other site from here

# the first step..
would be to make sure it all works good locally as one project 
maybe for now we will use url path to navigate between each site, and in the future we will add nice UI way

##

Good, it seems to work, with one exception 
the `http://localhost:4173/portfolio/barber/`
<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url(&quot;/assets/interior-banner.jpg&quot;);"></div>
the banner image is not loading correctly, it's just grey color 

same with the `<img src="/assets/favicon.jpg" alt="Latinos Barbershop Logo" class="w-12 h-12 rounded-full object-cover border-2 border-primary" data-testid="img-logo">`
icon

* all other sites seem to have all images loaded properly
