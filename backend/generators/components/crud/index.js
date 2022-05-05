module.exports = {
    description: "add crud component",
    prompts: [
        {
            type: "input",
            name: "entityName",
            message: "Entity Name"
        },
        {
            type: "input",
            name: "destionationPath",
            message: "Core folder path"
        }
    ],
    actions: (data) => {
        return [
            {
                type: "add",
                path: "{{destionationPath}}/domain/{{lowerCase entityName}}/{{lowerCase entityName}}.entity.ts",
                templateFile: "./components/crud/templates/example.entity.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/domain/{{lowerCase entityName}}/{{lowerCase entityName}}.dto.ts",
                templateFile: "./components/crud/templates/example.dto.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/domain/{{lowerCase entityName}}/{{lowerCase entityName}}.dto.messages.ts",
                templateFile: "./components/crud/templates/example.dto.messages.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/domain/{{lowerCase entityName}}/{{lowerCase entityName}}.adapter.ts",
                templateFile: "./components/crud/templates/example.adapter.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/application/{{lowerCase entityName}}.interactor.ts",
                templateFile: "./components/crud/templates/example.interactor.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/infraestructure/controllers/{{lowerCase entityName}}.controller.ts",
                templateFile: "./components/crud/templates/example.controller.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/framework/mongo/repositories/{{lowerCase entityName}}.repository.ts",
                templateFile: "./components/crud/templates/example.repository.ts.hbs",
                abortOnFail: true
            },
            {
                type: "add",
                path: "{{destionationPath}}/framework/mongo/schemas/{{lowerCase entityName}}.schema.ts",
                templateFile: "./components/crud/templates/example.schema.ts.hbs",
                abortOnFail: true
            }
        ];
    }
}