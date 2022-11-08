// Generated by Selenium IDE
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const wait = (t = 1000) => new Promise((r) => setTimeout(r, t));
const now = (d = new Date()) =>
  `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

describe('Primeira execução', function () {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });

  afterEach(async function () {
    setTimeout(async () => {
      await driver.quit();
    }, 200);
  });

  it('Cadastro de Segurança', async function () {
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.id('login-cadastro')).click();
    await driver.findElement(By.id('modal-cadastro-nome-input')).click();
    await driver
      .findElement(By.id('modal-cadastro-nome-input'))
      .sendKeys('Segurança Teste');
    await driver
      .findElement(By.id('modal-cadastro-tipo-usuario-input'))
      .click();
    await wait(100);
    await driver
      .findElement(By.css('.component-select-single-option:nth-child(2)'))
      .click();
    await driver
      .findElement(
        By.css('#modal-cadastro-confirmar > .component-button-label')
      )
      .click();
    {
      await wait(500);
      const elements = await driver.findElements(
        By.css('#header-usuario-button')
      );
      assert(elements && elements.length);
    }
  });
});

describe('Depois do cadastro', function () {
  this.timeout(30000);
  let driver;
  let vars;

  async function login() {
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.id('login-nome-input')).click();
    await driver
      .findElement(By.id('login-nome-input'))
      .sendKeys('Segurança Teste');
    await driver.findElement(By.id('login-entrar')).click();
    await driver.findElement(By.id('login-tipo-usuario-input')).click();
    await driver
      .findElement(By.css('.component-select-single-option:nth-child(2)'))
      .click();
    await driver.findElement(By.id('login-entrar')).click();
    {
      await wait(500);
      const elements = await driver.findElements(
        By.css('#header-usuario-button')
      );
      assert(elements && elements.length);
    }
  }

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
    await login();
    await wait(200);
  });

  afterEach(async function () {
    setTimeout(async () => {
      await driver.quit();
    }, 200);
  });

  const nomeEntrega = 'Misteriosa_' + now();

  it('Registrar Entrega', async function () {
    await driver.findElement(By.id('home-entregas')).click();
    await driver.findElement(By.id('entregas-cadastro-button')).click();
    await wait(300);
    await driver.findElement(By.id('cadastro-entrega-descricao-input')).click();
    await driver
      .findElement(By.id('cadastro-entrega-descricao-input'))
      .sendKeys(nomeEntrega);
    await driver.findElement(By.css('#cadastro-entrega-casa')).click();
    await wait(200);
    await driver
      .findElement(By.css('.component-select-single-option:nth-child(1)'))
      .click();
    await driver.findElement(By.id('cadastro-entrega-confirmar')).click();
    {
      await wait(600);
      const elements = await driver.findElements(
        By.xpath(`//*[text()='${nomeEntrega}']`)
      );
      assert(elements.length);
    }
  });

  it('Filtrar Entrega', async function () {
    await driver.findElement(By.id('home-entregas')).click();
    await driver.findElement(By.id('entregas-filtro-descricao-input')).click();
    await driver
      .findElement(By.id('entregas-filtro-descricao-input'))
      .sendKeys(nomeEntrega);
    await driver.findElement(By.id('entregas-filtro-retirada-input')).click();
    await driver
      .findElement(By.css('.component-select-single-option:nth-child(3)'))
      .click();
    {
      await wait(600);
      const elements = await driver.findElements(
        By.xpath(`//*[text()='${nomeEntrega}']`)
      );
      assert(elements.length);
    }
  });

  const rgMorador = Math.ceil(Math.random() * 100000);
  const nomeMorador = `Morador_${rgMorador}`;

  it('Cadastrar Morador', async function () {
    await driver.findElement(By.css('#home-moradores')).click();
    await driver.findElement(By.css('#moradores-adicionar')).click();
    await driver.findElement(By.id('cadastro-morador-nome-input')).click();
    await driver
      .findElement(By.id('cadastro-morador-nome-input'))
      .sendKeys(nomeMorador);
    await driver.findElement(By.id('cadastro-morador-rg-input')).click();
    await driver
      .findElement(By.id('cadastro-morador-rg-input'))
      .sendKeys(rgMorador);
    await driver.findElement(By.id('cadastro-morador-casa-input')).click();
    await driver
      .findElement(By.css('.component-select-single-option:nth-child(1)'))
      .click();
    await driver.findElement(By.css('#cadastro-morador-confirmar')).click();
    {
      await wait(800);
      const elements = await driver.findElements(
        By.xpath(`//*[text()='${rgMorador}']`)
      );
      assert(elements.length);
    }
  });

  it('Registrar Retirada', async function () {
    await driver.findElement(By.id('home-entregas')).click();
    await driver.findElement(By.id('entregas-filtro-descricao-input')).click();
    await driver
      .findElement(By.id('entregas-filtro-descricao-input'))
      .sendKeys(nomeEntrega);
    await driver.findElement(By.id('entrega-opcoes-0')).click();
    await wait(200);
    await driver.findElement(By.id('registrar-retirada-0')).click();
    await wait(200);
    await driver.findElement(By.id('cadastro-retirada-morador-input')).click();
    await driver.findElement(By.xpath(`//*[text()='${nomeMorador}']`)).click();
    await wait(150);
    await driver.findElement(By.id('cadastro-retirada-confirmar')).click();
    {
      await wait(800);
      const elements = await driver.findElements(By.xpath(`//*[text()='Sim']`));
      assert(elements.length);
    }
  });

  it('Desabilitar Morador', async function () {
    await driver.findElement(By.id('home-moradores')).click();
    await wait(200);
    await driver.findElement(By.id(`opcao-${rgMorador}`)).click();
    await wait(200);
    await driver.findElement(By.xpath(`//*[text()='Desativar']`)).click();
    await driver.findElement(By.css('.component-button-danger')).click();
    {
      await wait(800);
      const elements = await driver.findElements(
        By.css(`#opcao-${rgMorador}:disabled`)
      );
      assert(elements.length);
    }
  });
});
