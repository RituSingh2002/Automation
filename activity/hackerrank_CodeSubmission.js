 
const puppeteer = require("puppeteer");
const id = "rejorat247@edmondpt.com";
const pw = "Sona@2002";
let tab;
let idx;
let gCode;
// all functions of puppeteer promisifed => gives you a pending promise initially

// opens a new browser instance

let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
// Promise<Pending>

browserOpenPromise.then(function (browser) {
    console.log("Browser opened !!!");
    let allPagesPromise = browser.pages();
    return allPagesPromise;
  })
  .then(function (pages) {
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
  })
  .then(function () {
    let idTypePromise = tab.type("#input-1", id); // keyboard keys emulates
    return idTypePromise;
  })
  .then(function () {
    let pwTypePromise = tab.type("#input-2", pw);
    return pwTypePromise;
  })
  .then(function () {
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    ); //navigation => page change
    return loginPromise;
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise; //Promise<Pending>
  })
  .then(function () {
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    let allQuesATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuesATagsPromise;
  })
  .then(function (allQuesATags) {
    //[ {} , {} , {} , {} ]  =>[ <a href="laksnfkjasf"/> , <a href="akjsbfua" /> , <a href="alshifia" /> , <a href="akjjsbfa" /> ];
    // pendingPromise = tab.Akjsfnakjbsf(aTag)  => aTag.getAttribute("href"); => value
    let allLinksPromise = [];

    for (let i = 0; i < allQuesATags.length; i++) {
      let aTag = allQuesATags[i];
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, aTag);
      allLinksPromise.push(linkPromise);
    }
    // allLinksPromise = [ Promise<link> , Promise<link> , Promise<link> , Promise<link> ];
    let sbkaPromise = Promise.all(allLinksPromise);
    // return Promise<Pending>
    return sbkaPromise; //Promise<Pending> => Promise<[link , link , link , link]>
  })
  .then(function (allLinks) {
    // [ link , link , link , link]
    let completeLinks = allLinks.map(function (link) {
      return "https://www.hackerrank.com" + link;
    });
    // console.log(completeLinks);
    let oneQuesSolvePromise = solveQuestion(completeLinks[0]);
    // 2k
    for(let i=1; i<completeLinks.length ; i++){
      oneQuesSolvePromise = oneQuesSolvePromise.then( function(){
        let nextQuesSolvePromise = solveQuestion(completeLinks[i]);
        return nextQuesSolvePromise;
      })
    }
    // 10k
    return oneQuesSolvePromise;
  })
  .then(function () {
    console.log("All Ques Solved Succesfully !!!!");
  })
  .catch(function (error) {
    console.log(error);
  });

function waitAndClick(selector) {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise.then(function () {
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function () {
        // wait and click succesfully done
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function getCode() {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(".hackdown-content h3");
    waitPromise
      .then(function () {
        let allCodeNamesElementsPromise = tab.$$(".hackdown-content h3");
        return allCodeNamesElementsPromise;
      })
      .then(function (allCodeNameElements) {
        // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
        let allCodeNamesPromise = [];
        for (let i = 0; i < allCodeNameElements.length; i++) {
          let codeNamePromise = tab.evaluate(function (elem) {
            return elem.textContent;
          }, allCodeNameElements[i]);
          allCodeNamesPromise.push(codeNamePromise);
        }
        // allCodeNamesPromise = [  Promise<Pending> , Promise<Pending> , Promise<Pending> ];
        let sbkaPromise = Promise.all(allCodeNamesPromise);
        return sbkaPromise; //Prmose<Pending> => Promise<["C++" , "Python" , "Java"]>
      })
      .then(function (codeNames) {
        //["C++" , "Python" , "Java"];
        for (let i = 0; i < codeNames.length; i++) {
          if (codeNames[i] == "C++") {
            idx = i;
            break;
          }
        }
        let allCodeDivPromise = tab.$$(".hackdown-content .highlight");
        return allCodeDivPromise; // Promise<Pending>
      })
      .then(function (allCodeDivs) {
        //[ <div></div> , <div></div> , <div></div> ];
        let codeDiv = allCodeDivs[idx];
        let codePromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, codeDiv);
        return codePromise;
      })
      .then(function (code) {
        gCode = code;
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function pasteCode() {
  return new Promise(function (resolve, reject) {
    let problemTabClickPromise = tab.click('div[data-attr2="Problem"]');
    problemTabClickPromise.then(function () {
        let waitAndClickPromise = waitAndClick(".checkbox-input");
        return waitAndClickPromise;
      })
      .then(function () {
        let waitForTextBoxPromise = tab.waitForSelector(".input-wrap");
        return waitForTextBoxPromise;
      })
      .then(function () {
        let codeTypePromise = tab.type(".input-wrap", gCode);
        return codeTypePromise;
      })
      .then(function () {
        let controlKeyDownPromise = tab.keyboard.down("Control");
        return controlKeyDownPromise;
      })
      .then(function () {
        let aKeyPressPromise = tab.keyboard.press("A");
        return aKeyPressPromise;
      })
      .then(function () {
        let xKeyPressPromise = tab.keyboard.press("X");
        return xKeyPressPromise;
      })
      .then(function(){
        let clickedOnCodeBoxPromise = tab.click('.monaco-editor.no-user-select.vs');
        return clickedOnCodeBoxPromise;
      })
      .then(function(){
        let aKeyPressPromise = tab.keyboard.press("A");
        return aKeyPressPromise;
      })
      .then(function () {
        let vKeyPressPromise = tab.keyboard.press("V");
        return vKeyPressPromise;
      })
      .then(function () {
        let controlKeyUpPromise = tab.keyboard.up("Control");
        return controlKeyUpPromise;
      }).then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
  });
}

function handleLockBtn(){
  return new Promise(function(scb , fcb){
    let waitForLockBtn = tab.waitForSelector('.editorial-content-locked .ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:50000});
    
    waitForLockBtn.then(function(){
      return tab.$$('.editorial-content-locked .ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
    })
    .then(function(lockButton){
      return tab.evaluate(function(elem){ return elem.click()  } , lockButton);
    })
    .then(function(){
      // Lock Button Found !!
      console.log("Lock Button Found !!");
      scb();
    })
    .catch(function(){
      // Lock Button Not Found !!
      console.log("Lock Button not found !!");
      scb();
    })
  })
}

function solveQuestion(qLink) {
  return new Promise(function (resolve, reject) {
    let gotoPromise = tab.goto(qLink);
    gotoPromise.then(function () {
        let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
        return waitAndClickPromise;
      })
      // .then(function(){
      //   let lockBtnPromise = handleLockBtn();
      //   return lockBtnPromise;
      // })
      .then(function () {
        // this function will get code of c++ and set in gCode variable
        let codePromise = getCode();
        return codePromise;
      })
      .then(function () {
        // this function will pasteCode in the editor from the gCode variable
        let pastePromise = pasteCode();
        return pastePromise;
      })
      .then(function () {
        let submitPromise = tab.click(' .ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled');
        return submitPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error)
      })
  });
}
 