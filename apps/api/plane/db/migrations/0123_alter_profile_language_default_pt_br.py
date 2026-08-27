# Generated for the pt-BR localization fork.
#
# Altera apenas o DEFAULT do campo `language` do perfil, de "en" para "pt-BR".
# AlterField de default não reescreve linhas existentes: quem já tem um idioma
# escolhido continua com ele. O efeito é só sobre perfis criados a partir daqui.

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0122_alter_draftissue_assignees_alter_issue_assignees_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="language",
            field=models.CharField(default="pt-BR", max_length=255),
        ),
    ]
