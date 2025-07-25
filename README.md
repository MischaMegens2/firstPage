# firstPage
**firstPage** is a plugin for Zotero 7. It automatically determines
`{{firstPage}}` from `{{pages}}` and `{{journalAbbreviation}}` from `{{publicationTitle}}`
when you are [renaming files](https://www.zotero.org/support/file_renaming) automatically.\
You can customize the filename format from the General pane of the Zotero settings.
Personally, I like to name my files like so:
```
{{ authors max="3" join="" suffix="_" }}
{{ journalAbbreviation replaceFrom="[\. ]" replaceTo="" regexOpts="g" truncate="32" }}
{{ volume }}
{{ year prefix="(" suffix=")" }}
{{ firstPage }} {{ title truncate="100" }}
```
This is intended to provide filenames like

> CrawfordStraley_RevSciInstrum92(2021)124707 Improved prescription for winding and electromagnet.pdf

However, the `{{firstPage}}` and `{{journalAbbreviation}}` fields are often not populated, 
so the template above does not work right away, unfortunately; the result is:

> CrawfordStraley_92(2021) Improved prescription for winding and electromagnet.pdf

This plugin tries to help with that: when these fields are empty,
it tries to derive `{{firstPage}}` from `{{pages}}`, by splitting it at the hyphen
(or En dash, or Em dash, as appropriate) and keeping only the first part;
and it tries to derive `{{journalAbbreviation}}` from `{{publicationTitle}}`,
by calling *Zotero.Cite.getAbbreviation()*.

You can install the plugin by downloading [firstpage.xpi](https://github.com/MischaMegens2/firstPage/tree/main/firstpage.xpi)
(using the 'Download raw file' button);
then, in Zotero, select *Tools*&rarr;*Plugins*
to open the Plugins Manager window;
and drag-and-drop the .xpi on it.
