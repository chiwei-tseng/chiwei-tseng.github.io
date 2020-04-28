class Rule{

  constructor(){

    ruleSize = 20;
    rx = width/2;
    ry = 150;

  }

  writeRule() {
    fill(255);
    textSize(ruleSize);
    textAlign(CENTER, BOTTOM);
    textFont(ruleFont);
    text(rule, width/2, ry);

  }






}
