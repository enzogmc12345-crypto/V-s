from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'feImage', 'feGaussianBlur', 'feDisplacementMap', 'feMerge', 'feMergeNode', 'feColorMatrix', 'feComponentTransfer', 'feFuncA'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in self.void_elements:
            return
        if not self.stack:
            self.errors.append(f"Unexpected end tag </{tag}>")
            return
        if self.stack[-1] == tag:
            self.stack.pop()
        else:
            # Maybe it's unclosed?
            if tag in self.stack:
                while self.stack[-1] != tag:
                    unclosed = self.stack.pop()
                    self.errors.append(f"Unclosed tag <{unclosed}> before </{tag}>")
                self.stack.pop()
            else:
                self.errors.append(f"Unexpected end tag </{tag}> (not in stack)")

parser = MyHTMLParser()
with open('index.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

if parser.stack:
    print("Unclosed tags remaining:", parser.stack)
else:
    print("No unclosed tags!")
if parser.errors:
    print("Errors:")
    for e in parser.errors[:20]:
        print(e)
