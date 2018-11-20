# Add preload links for "<script...",
  # e.g <script type="text/javascript" src="file.js"></script>
  #     =>
  #       <link rel="preload" href="file.js" as="script"><script type="text/javascript" async src="file.js"></script>
  echo "Add preload links for \"<script...\"..."
  sed -i -- "s/<script/\n<script/g" "dist/witflux/index.html" # each one need to be in one line
  sed -i -- "s/<script.*src=\"\(.*\.js\)\".*<\/script>/<link rel=\"preload\" href=\"\1\" as=\"script\"><script type=\"text\/javascript\" defer src=\"\1\"><\/script>/g" "dist/witflux/index.html"

  # Load CSS as non blocking
  echo "Load CSS as non blocking..."
  sed -i -- "s/<link/\n<link/g" "dist/witflux/index.html"
  # sed -i -- "s/<link.*href=\"\(.*\.css\)\".*\/>/<link rel=\"preload\" href=\"\1\" as=\"style\" onload=\"onScriptLoad(this)\"\/>/g" "dist/witflux/index.html"

  # Google 1st way
  # sed -i -- "s/<link.*href=\"styles\(.*\.css\)\".*\/>/<noscript id=\"deferred-styles\"><link rel=\"preload\" href=\"styles\1\" as=\"style\"><\/noscript>/g" "dist/witflux/index.html"

  # Google 2nd way (best)
  # sed -i -- "s/<link.*href=\"\(.*\.css\)\".*\/>/<link rel=\"preload\" href=\"\1\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\"><noscript><link rel=\"stylesheet\" href=\"\1\"><\/noscript>/g" "dist/witflux/index.html"
