# Aprendendo Scss

## Compilando Scss
1- Para compilar em SCSS é bem simples, utilizei os seguintes passos:

  -- Criei uma pasta, e a abri com o terminal, então instalei o pacote node-sass do npm globalmente (sudo npm i -g node-sass).

  -- No arquivo package.json inseri o script:

    "scss": "node-sass -watch -o dist/css scss/style.scss"
  
  -- E pronto!


## Criando variáveis

2- No CSS utilizamos a seguinte sintaxe para criar variáveis:

```
:root {
  --primary-color: rgb(255, 255, 255);
  --secondary-color: rgb(125, 145, 33);  
}
```

Porém em Scss criamos assim:

```
  $primary-color: rgb(255, 255, 255);
  $secondary-color: rgb(123, 181, 219);  
  $text-color: rgb(53, 51, 51);
  $font-weights {
    "regular": 400,
    "medium": 500,
    "bold": 700
  }
```

e usamos assim:

```
  background: $primary-color;
  font-weight: map-get($font-weights, medium);
```

## Criando arquivos separados
3- Estruturar um projeto com Scss é muito simples, não é necessário importar vários arquivos no html como no CSS puro.

Para criar módulos é necessário apenas criar um arquivo com a sintaxe (_nomeDoArquivo.scss).

Após isso, no arquivo principal do scss escrevemos (@import "nomeDoArquivo"), sem a extensão .scss e underscore.


Exitem duas maneiras de importar no estilo principal do Scss (que eu saiba!).

- Primeira: 

```
  @import "./nomeDoArquivo";
  @import "./resets";
  @import "./variables";
```

- Segunda: 

```
  @import 
    "./nomeDoArquivo",
    "./resets",
    "./variables".
```

## Funções

4 -Aqui o bicho começa a ficar mais complicado, lá no começa usamos o map-get para definir tamanho da fonte, mas podemos usar uma função para simplificar isso.

```
@function weight($weight-name) {
  @return map-get($font-weights, $weight-name);
}

```

Agora podemos usar apenas o nome da função e passar o nome com parâmetro

```
  font-weight: weight(regular);
```

### Mixins

Mixins serve para suprimir a repetição de código, ou seja, facilita muito a vida.

Utilizamos muito flexbox e o arquivo CSS fica cheio de repetições, já no Scss podemos fazer isso aqui:

```
@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

E incluir onde quisermos

```
  .content {
    width: 80%;
    margin: 0 auto;
    
    @include flexCenter;

    #{&}__text {
      color: $text-color;
      &:hover {
        color: pink;
      }
    }
  } 
```

Também é possível enviar regras nos parâmetros.

``` 
  @mixin flexCenter($direction) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: $direction;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    
    @include flexCenter(column);
  }
```



Funções são utilizadas para computar e retornar valores, porém os mixins são utilizados para definir estilos.

### Criando um tema claro com mixins

Definimos um mixin theme e passamos como parâmetro um valor booleanos. Inclusive, olha que insano, tem condições dentro. 

```
@mixin theme($light-theme: true) {
  @if $light-theme {
    background-color: lighten($primary-color, 100%);
    color: darken($text-color, 100%);
  }
}
```

Aqui incluímos na classe o tema, se passarmos true o tema será claro, caso false será escuro.

```
  .light {
    @include theme(true);
  }
```

### Media Query com mixins

@media dá muita dor de cabeça, no Scss é muito mais simples de usar. Fazendo apenas um mixin e já facilita bastante.

```
  $mobile: 800px;

  @mixin mobile {
    @media (max-width: $mobile) {
      @content;
    }
  }

 @include mobile {
    flex-direction: column;
  }
```

## Extends

5- Quando há um estilo todo feito em certa classe e em um novo elemento/classe precisamos do mesmo estilo e um pouco mais, no Scss é possível usar o @extends. Sua função é incluir os estilos de uma outra classe para a que queremos estilizar.

Aqui incluímos o estilo feito em __text1 para o __text2 e apenas mudamos a cor do hover.

```
  .content {
    width: 80%;
    margin: 0 auto;
    
    @include flexCenter(row);

    #{&}__text1 {
      color: $text-color;
      &:hover {
        color: $secondary-color;
      }
    }

    @include mobile {
      flex-direction: column;
    }

    #{&}__text2 {
      @extend .content__text1;

      &:hover {
        color: $accent-color;
      }
    }
  }
```

