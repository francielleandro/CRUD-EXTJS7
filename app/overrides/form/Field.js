Ext.define('MyCrudApp.overrides.form.Field', {
    override: 'Ext.field.Field',

    validate: function(skipLazy) {
        var me = this,
            empty, errors, field, record, validity, value;

        // Se estamos em configuração e não validando nenhum valor, saia daqui
        if (me.isConfiguring && me.validateOnInit === 'none') {
            return true;
        }

        // Se o campo estiver desativado e a configuração não estiver definida para validar campos desativados, saia daqui
        if (!me.getDisabled() || me.getValidateDisabled()) {
            errors = [];

            // Se for um campo de entrada textual, obtenha o valor do elemento de entrada.
            // Verifique o estado de validade do DOM primeiro no caso de um type="number"
            // verificação ter falhado.
            if (me.isInputField && !me.isSelectField) {
                value = me.getInputValue();
                empty = !value;
                // validity = empty && me.inputElement.dom.validity;
                validity = empty && me.inputElement.dom.validity;
                if (validity && validity.badInput) {
                    errors.push(me.badFormatMessage);
                    empty = false;
                }
            }
            else {
                value = me.getValue();
                empty = value === '' || value == null;
            }

            if (empty && me.getRequired()) {
                errors.push(me.getRequiredMessage());
            }
            else if (!errors.length) {
                if (!empty) {
                    // Passe valores não vazios para parseValue para lidar com coisas como
                    // datefield e numberfield. Tecnicamente, essa preocupação é mais de um
                    // problema de textfield family, mas é difícil sair dessa
                    // sequência de tal forma que um substituição cirúrgica seja prática...
                    // Então, simplesmente fornecemos identityFn como o padrão parseValue impl
                    value = me.parseValue(value, errors);
                }

                if (!errors.length) {
                    field = me._validationField;
                    record = me._validationRecord;

                    if (field && record) {
                        field.validate(value, null, errors, record);
                    }

                    if (!empty) {
                        me.doValidate(value, errors, skipLazy);
                    }
                }
            }

            if (errors.length) {
                me.setError(errors);

                return false;
            }
        }

        me.setError(null);

        return true;
    }
});
