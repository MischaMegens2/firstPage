var originalGetFileBaseNameFromItem;

function log(msg) {
	Zotero.debug("firstPages: " + msg);
}

function install() {
	log("Installed 2.0");
}

function getFirstPage(pages) {
  return (pages || "").split(/[-–—]/)[0].trim();
}

function getJournalAbbrev(abbr, title) {
  if (abbr) {
    return abbr;
  }
  if (title) {
    var obj = {
      default: {
        "container-title": {}
      }
    };
    Zotero.Cite.getAbbreviation(
      "journalAbbreviation",  // list name
      obj,
      "default",              // jurisdiction
      "container-title",      // category
      title                   // the full journal name (key)
    );
    var abbr = obj.default["container-title"][title];
    Zotero.debug("Result:  " + abbr);
    return abbr;
  }
  else
  {
    return "";
  }
}

async function startup({ id, version, rootURI }) {
	log("Starting 2.0");
	
	Zotero.PreferencePanes.register({
		pluginID: 'firstpage@example.com',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});

  originalGetFileBaseNameFromItem = Zotero.Attachments.getFileBaseNameFromItem;
  Zotero.Attachments.getFileBaseNameFromItem = function(item, options = {}) {
    const oldGetField = item.getField.bind(item);
    item.getField = function(field, unformatted, includeBaseMapped) {
      if (field === 'firstPage') {
        return getFirstPage(oldGetField('pages', unformatted, includeBaseMapped));
      }
      if (field === 'journalAbbreviation') {
        return getJournalAbbrev(
          oldGetField('journalAbbreviation', unformatted, includeBaseMapped),
          oldGetField('publicationTitle', unformatted, includeBaseMapped)
        );
      }
      return oldGetField(field, unformatted, includeBaseMapped);
    };

    try {
      return originalGetFileBaseNameFromItem.call(this, item, options);
    } finally {
      item.getField = oldGetField;
    }
  };

  Zotero.debug("FirstPage plugin loaded: {{ firstPage }} and {{ journalAbbreviation }} in File Renaming.");
}

function shutdown() {
	log("Shutting down 2.0");
  Zotero.Attachments.getFileBaseNameFromItem = originalGetFileBaseNameFromItem;
}

function uninstall() {
	log("Uninstalled 2.0");
}
