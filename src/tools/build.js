const fs = require('fs');
const path = require('path');
const { compile } = require('ejs');
const rimraf = require('rimraf');

const rm = (path) => new Promise((resolve, reject) => rimraf(path, (err) => {
  if (err) {
    return reject(err);
  }
  return resolve();
}));

const links = require('../../links');
const buildLinkTree = require('../buildLinkTree');

const prepareBuildFolder = async () => {
  try {
    await rm(path.join(__dirname, '../../build'));
  } catch (e) {
    console.log(`No build directory, so no need to kill it`);
  }

  try {
    fs.mkdirSync(path.join(__dirname, '../../build'));
  } catch (e) {
    throw new Error(e);
  }
};

const buildHtml = async () => {
  const templateRaw = fs.readFileSync(path.join(__dirname, '../template.ejs'));
  const template = compile(templateRaw.toString());

  fs.writeFileSync(
    path.join(__dirname, '../../build/index.html'),
    template({ links: buildLinkTree(links) })
  );
};

const copyPublic = async () => {
  fs.readdir(path.join(__dirname, '../../public'), (err, items) => {
    items.forEach((item) => {
      fs.copyFileSync(
        path.join(__dirname, '../../public', item),
        path.join(__dirname, '../../build', item),
      );
    });
  });
};

const build = async () => {
  await prepareBuildFolder();

  return Promise.all([
    copyPublic().then(() => console.log('Public files copied! Huzzah!')),
    buildHtml().then(() => console.log('HTML built! Good show!')),
  ]);
};

build();
