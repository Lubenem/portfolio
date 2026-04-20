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

##

Good! 
Let's make the `portfolio` page the main page which will open by default with a default route 

also when we do `BASE_PREFIX=/portfolio` 
`portfolio/portfolio` is the route for the `portfolio` site 
I don't like how it looks, could we just drop the prefix, why do we even need it?

Make the `portfolio` the main site , and a new section (call it `portfolio`)
there show a nice list of placeholder png pictures (I will feel them with a screenshot of each site)
when the user clicks on image/item from portfolio list => he should be redirected to the appropriate site (route)
the list should be addaptable for different screens (flex)

##
let's apply some UI fixes for the portfolio site
[~/projects/portfolio/sites/portfolio](~/projects/portfolio/sites/portfolio)

1. #portfolio > div > div.grid.gap-6.sm\:grid-cols-2.lg\:grid-cols-3

@media (min-width: 1024px) {
    .lg\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

for bigger screens let's make it so we have 2 rows and 5 columns
(let's just change `repeat(3..` to `repeat(5..`)

2. #portfolio > div > div.grid.gap-6.sm\:grid-cols-2.lg\:grid-cols-3 > a:nth-child(5) 
also, on hover, each element of the sites list, should have a nice little (and quick) stretch animation. 
subtle but nice, just make them abit bigger on hover, and then they should go to the original size on mouse leave, keep it simple

##

nice! 

1. #about > div > div.grid.grid-cols-1.md\:grid-cols-3.gap-4.md\:gap-6
other elements in the portfolio site, come to existence (on page load) with a nice animation (and fade out),
but our new site items list, pops up simply..
could we align our site items list to the old flow of the site?

2. also when I click on a demo site element, I want to be redirected to a new tab, please change current behavior of opening the demo straight in the same tab

##

Ok, it seems like we are done with the UI fixes, Now I want to publish/host our project (with all of it subsites) on github 

[docs](~/projects/portfolio/docs)
- as I understood, the github pages should use this folder, but it seems like our latest UI fixes didn't affect this folder (I checked git) 

care to explain?
