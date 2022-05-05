import { addAliases } from 'module-alias';
import { join } from 'path';

addAliases({
    '@config': join(__dirname, '../src/config'),
    "@bootstrap": join(__dirname, "./"),
    "@modules": join(__dirname, '../src/modules'),
    "@controllers": join(__dirname, '../src/core/infraestructure/controllers'),
    "@events": join(__dirname, '../src/core/infraestructure/events'),
    "@application": join(__dirname, '../src/core/application'),
    "@domain": join(__dirname, '../src/core/domain'),
    "@framework": join(__dirname, '../src/core/framework')
});